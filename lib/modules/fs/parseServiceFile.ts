import { readFile } from "fs/promises";
import { parse } from "toml";
import { ServiceConfig } from "../../types/ServiceConfig.type";
import { ok } from "assert";

export default async function parseServiceFile (path: string) {
    const content = await readFile(path, "utf-8");
    const data: ServiceConfig = parse(content);

    if (!data.network) data.network = {};
    if (!data.service) data.service = {};
    if (!data.githooks) data.githooks = {};
    if (!data.commands) data.commands = {};
    if (!data.ssl) data.ssl = {};
    if (!data.git) data.git = {};

    ok(data.name, "Service name not found in service file: " + path);
    ok(data.cwd, "Service cwd not found in service file: " + path);

    ok(!data.network.domain || data.network.port, "Service network port not found in service file: " + path);

    return data;
}