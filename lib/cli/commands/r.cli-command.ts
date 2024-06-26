import { ok } from "assert";
import getServiceOutputFolder from "../../modules/config/getServiceOutputFolder";
import ensureServiceOutputFolder from "../../modules/config/ensureServiceOutputFolder";
import { join } from "path";
import Paths from "../../const/Paths.const";
import deleteFile from "../../modules/fs/deleteFile";
import printMessage from "../../../plugins/cli/lib/modules/stdout/printMessage";
import StyleOK from "../../styles/OK.style";
import parseServiceFile from "../../modules/fs/parseServiceFile";

interface IOptions {
    
}

export default async function rREPLCommand ([ serviceFile ]: string[], options: IOptions) {
    ok(serviceFile, "Usage: sm r <service-file>"); 
    
    const config = await parseServiceFile(serviceFile);
    const serviceName = config.name;
    const serviceOutputFolder = await getServiceOutputFolder(serviceName);

    await ensureServiceOutputFolder(serviceName);

    const targets = {
        service: join(serviceOutputFolder, `${serviceName}.service`),
        nginx: join(serviceOutputFolder, `${serviceName}.conf`),
        githooks: join(serviceOutputFolder, `${serviceName}.toml`),
    };

    const links = {
        service: join(Paths.systemd, `${serviceName}.service`),
        nginx: join(Paths.nginx, `${serviceName}.conf`),
        githooks: join(Paths.githooks, `${serviceName}.toml`),
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