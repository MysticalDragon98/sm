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

interface IOptions {

}

export default async function cREPLCommand ([ inputFile ]: string[], options: IOptions) {
    const config = await parseServiceFile(inputFile);
    const serviceFile = await generateSystemServiceFile(config);
    const nginxFile = await generateNginxFile(config);
    const githooksFile = await generateGithooksFile(config);
    const serviceName = config.name;

    const serviceOutputFolder = await getServiceOutputFolder(serviceName);

    const targets = {
        service: join(serviceOutputFolder, `${serviceName}.service`),
        nginx: join(serviceOutputFolder, `${serviceName}.conf`),
        githooks: join(serviceOutputFolder, `${serviceName}.${config.git.branch ?? "master"}.sh`),
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
}