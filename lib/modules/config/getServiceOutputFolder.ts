import { join } from "path";
import loadSMConfig from "./loadSMConfig";

export default async function getServiceOutputFolder (serviceName: string) {
    const config = await loadSMConfig();

    return join(config.services, serviceName);
}