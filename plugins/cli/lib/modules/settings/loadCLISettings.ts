import { readFile } from "fs/promises";
import { ICLISettings } from "../../interfaces/CLISettings.interface";
import { join } from "path";

export async function loadCLISettings(): Promise<ICLISettings> {
    try {
        const _module = await import(join(__dirname, "../../../../../cli.config.ts"));

        return _module.default;
    } catch (error) {
        if (error.code === "MODULE_NOT_FOUND") {
            return <ICLISettings> {

            }
        }

        throw error;
    }
}