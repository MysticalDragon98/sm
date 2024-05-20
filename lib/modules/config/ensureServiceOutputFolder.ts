import ensureDir from "../fs/ensureDir";
import getServiceOutputFolder from "./getServiceOutputFolder";

export default async function ensureServiceOutputFolder (serviceName: string) {
    const folder = await getServiceOutputFolder(serviceName);

    await ensureDir(folder);
}