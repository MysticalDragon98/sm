import { ok } from "assert";
import getServiceOutputFolder from "../../modules/config/getServiceOutputFolder";
import ensureServiceOutputFolder from "../../modules/config/ensureServiceOutputFolder";
import { join } from "path";
import Paths from "../../const/Paths.const";
import deleteFile from "../../modules/fs/deleteFile";
import printMessage from "../../../plugins/cli/lib/modules/stdout/printMessage";
import StyleOK from "../../styles/OK.style";

interface IOptions {
    
}

export default async function rREPLCommand ([ serviceName ]: string[], options: IOptions) {
    ok(serviceName, "Usage: sm r <service name>"); 
    const serviceOutputFolder = await getServiceOutputFolder(serviceName);

    await ensureServiceOutputFolder(serviceName);

    const targets = {
        service: join(serviceOutputFolder, `${serviceName}.service`),
        nginx: join(serviceOutputFolder, `${serviceName}.conf`),
        githooks: join(serviceOutputFolder, `${serviceName}.${config.git.branch ?? "master"}.sh`),
    };

    const links = {
        service: join(Paths.systemd, `${serviceName}.service`),
        nginx: join(Paths.nginx, `${serviceName}.conf`),
        githooks: join(Paths.githooks, `${serviceName}/${config.git.branch ?? "master"}.sh`),
    };

    await deleteFile(targets.service);
    printMessage(StyleOK(), `Deleted service file: ${targets.service}`);

    await deleteFile(targets.nginx);
    printMessage(StyleOK(), `Deleted nginx file: ${targets.nginx}`);

    await deleteFile(targets.githooks);
    printMessage(StyleOK(), `Deleted githooks file: ${targets.githooks}`);

    await deleteFile(links.service);
    printMessage(StyleOK(), `Deleted service link: ${links.service}`);

    await deleteFile(links.nginx);
    printMessage(StyleOK(), `Deleted nginx link: ${links.nginx}`);

    await deleteFile(links.githooks);
    printMessage(StyleOK(), `Deleted githooks link: ${links.githooks}`);
}