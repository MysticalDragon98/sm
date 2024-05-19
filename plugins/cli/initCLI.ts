import executeCLICommand from "./lib/modules/commands/executeCLICommand";
import Minimist from "minimist";
import CLIContext from "./lib/const/CLIContext";
//* Imports


export default async function initCLI (options: { boolean?: string[] }) {
    if (options.boolean) options.boolean = [];

    const minimistArgs = Minimist(process.argv.slice(2), {
        boolean: [
            ...options.boolean,
            "json",
            "raw",
            "silent"
        ]
    });
    
    CLIContext.json = minimistArgs.json;
    CLIContext.raw = minimistArgs.raw;
    CLIContext.silent = minimistArgs.silent;
    CLIContext.tty = process.stdout.isTTY;

    await executeCLICommand(minimistArgs._, {
        options: minimistArgs,
    }); 
}