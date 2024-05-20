import printMessage from "../../../plugins/cli/lib/modules/stdout/printMessage";
import parseServiceFile from "../../modules/fs/parseServiceFile";
import generateGithooksFile from "../../modules/generators/generateGithooksFile";
import generateNginxFile from "../../modules/generators/generateNginxFile";
import generateSystemServiceFile from "../../modules/generators/generateSystemServiceFile";
import StyleOK from "../../styles/OK.style";
import StyleError from "../../styles/Error.style";
import { writeFile } from "fs/promises";
import getServiceOutputFolder from "../../modules/config/getServiceOutputFolder";
import { join } from "path";
import ensureServiceOutputFolder from "../../modules/config/ensureServiceOutputFolder";
import existsFile from "../../modules/fs/existsFile";
import Paths from "../../const/Paths.const";
import createLink from "../../modules/fs/createLink";
import deleteFile from "../../modules/fs/deleteFile";
import ensureDir from "../../modules/fs/ensureDir";
import executeShCommand from "../../modules/sh/executeShCommand";

interface IOptions {

}

export default async function cREPLCommand ([ inputFile ]: string[], options: IOptions) {
    const config = await parseServiceFile(inputFile);
    const serviceFile = await generateSystemServiceFile(config);
    const nginxFile = await generateNginxFile(config);
    const githooksFile = await generateGithooksFile(config);
    const serviceName = config.name;

    const serviceOutputFolder = await getServiceOutputFolder(serviceName);

    await ensureServiceOutputFolder(serviceName);

    const targets = {
        service: join(serviceOutputFolder, `${serviceName}.service`),
        nginx: join(serviceOutputFolder, `${serviceName}.conf`),
        githooks: join(serviceOutputFolder, `${serviceName}.${config.git.branch ?? "master"}.toml`),
    };

    const links = {
        service: join(Paths.systemd, `${serviceName}.service`),
        nginx: join(Paths.nginx, `${serviceName}.conf`),
        githooks: join(Paths.githooks, `${serviceName}/${config.git.branch ?? "master"}.toml`),
    };
    
    try {
        await writeFile(targets.service, serviceFile);
        printMessage(StyleOK(), `Generated service file: ${targets.service}`);
    } catch (error) {
        printMessage(StyleError(), `Failed to generate service file ${targets.service}: ${error}`);
        return;
    }

    try {
        await writeFile(targets.nginx, nginxFile);
        printMessage(StyleOK(), `Generated nginx file: ${targets.nginx}`);
    } catch (error) {
        printMessage(StyleError(), `Failed to generate nginx file ${targets.nginx}: ${error}`);
        return;
    }

    try {
        await writeFile(targets.githooks, githooksFile);
        printMessage(StyleOK(), `Generated githooks file: ${targets.githooks}`);
    } catch (error) {
        printMessage(StyleError(), `Failed to generate githooks file ${targets.githooks}: ${error}`);
        return;
    }

    try {
        if (await existsFile(links.service)) { 
            await deleteFile(links.service);

            printMessage(StyleOK(), `Deleted service link: ${links.service}`);
        }

        await createLink(targets.service, links.service);
        printMessage(StyleOK(), `Created service link: ${links.service}`);
    } catch (error) {
        printMessage(StyleError(), `Failed to create service link ${links.service}: ${error}`);
        return;
    }

    try {
        if (await existsFile(links.nginx)) { 
            await deleteFile(links.nginx);

            printMessage(StyleOK(), `Deleted nginx link: ${links.nginx}`);
        }

        await createLink(targets.nginx, links.nginx);
        printMessage(StyleOK(), `Created nginx link: ${links.nginx}`);
    } catch (error) {
        printMessage(StyleError(), `Failed to create nginx link ${links.nginx}: ${error}`);
        return;
    }

    try {
        if (await existsFile(links.githooks)) { 
            await deleteFile(links.githooks);

            printMessage(StyleOK(), `Deleted githooks link: ${links.githooks}`);
        }

        await ensureDir(join(Paths.githooks, serviceName));
        await createLink(targets.githooks, links.githooks);
        printMessage(StyleOK(), `Created githooks link: ${links.githooks}`);
    } catch (error) {
        printMessage(StyleError(), `Failed to create githooks link ${links.githooks}: ${error}`);
        return;
    }

    await executeShCommand(`sudo systemctl daemon-reload`);
    printMessage(StyleOK(), `Reloaded systemd daemon`);

    await executeShCommand(`sudo systemctl enable ${serviceName}`);
    printMessage(StyleOK(), `Enabled service: ${serviceName}`);

    await executeShCommand(`sudo systemctl start ${serviceName}`);
    printMessage(StyleOK(), `Started service: ${serviceName}`);

    await executeShCommand(`sudo systemctl restart nginx`);
    printMessage(StyleOK(), `Restarted nginx`);
}