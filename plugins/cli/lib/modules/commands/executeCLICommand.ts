import { join, resolve } from "path";
import CLICommandOptions from "../../interfaces/CLICommandOptions.interface";
import { access } from "fs/promises";

export default async function executeCLICommand (args: string[], { options }: CLICommandOptions = { options: {} }) {
    let folder = resolve(__dirname, "../../../../../lib/cli/commands");
    let cliArgs = [];
    let command = "";

    if (options.help || args.length === 0 || options.h) {
        command = "help";
        cliArgs = [args[0] ?? typeof options.help === "string" ? options.help : null].filter(Boolean);
        options["simple"] = <any>true;
    }

    for (let i=0;i<args.length;i++) {
        const currentArg = args[i].toString();

        try {
            await access(join(folder, currentArg));
            folder = join(folder, currentArg);
        } catch (error) {
            if (error.code === "ENOENT") {
                command = currentArg;
                cliArgs = args.slice(i + 1);
                break;
            }

            throw error;
        }
    }

    const commandsPath = join(folder, command + ".cli-command.js");
    let commandModule;

    try {
        commandModule = await import(commandsPath);
    } catch (error) {
        if (error.code === "MODULE_NOT_FOUND") {
            throw new Error(`Command ${command} not found`);
        }

        throw error;
    }
    

    await commandModule.default(cliArgs, options);
}
