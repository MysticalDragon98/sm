import { readFile } from "fs/promises";
import { parse } from "toml";
import { SMConfig } from "../../types/SMConfig.type";

let _config: SMConfig;

export default async function loadSMConfig () {
    if (_config) return _config;

    try {
        const file = await readFile("/etc/sm.d/conf.toml", "utf-8");
        return _config = await parse(file);
    } catch (error) {
        if (error.code === "ENOENT") {
            return _config = <SMConfig> {
                services: "/etc/sm.d/services/"
            }
        }
    }
}