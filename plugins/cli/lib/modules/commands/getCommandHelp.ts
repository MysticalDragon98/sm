import { resolve } from "path";
import { ICLICommandHelp } from "../../interfaces/CLICommandHelp.interface";

export default async function getCommandHelp (command: string[]) {
    const path = resolve(__dirname, "../../../../../lib/cli/docs/help/" + command.join("/") + ".command-help.ts");
    
    try {
        const content = await import(path);
        return content.default as ICLICommandHelp;
    } catch (error) {
        if (error.code === "MODULE_NOT_FOUND") {
            return null;
        }

        throw error;
    }
}