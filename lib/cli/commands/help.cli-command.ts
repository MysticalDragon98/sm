import getCommandHelp from "../../../plugins/cli/lib/modules/commands/getCommandHelp";
import getExistingCommands from "../../../plugins/cli/lib/modules/commands/getExistingCommands";
import { loadCLISettings } from "../../../plugins/cli/lib/modules/settings/loadCLISettings";
import { loadProjectSettings } from "../../../plugins/cli/lib/modules/settings/loadProjectSettings";
import StyleCommand from "../../../plugins/cli/lib/styles/Command.style";
import StyleHighlight from "../../../plugins/cli/lib/styles/Highlight.style";
import StyleInfoMark from "../../../plugins/cli/lib/styles/InfoMark.style";

interface IOptions {
    simple?: boolean;
    full?: boolean;
}

export default async function helpREPLCommand ([ _command ]: string[], options: IOptions) {
    const settings = await loadCLISettings();
    const projectSettings = await loadProjectSettings();
    const name = settings.name ?? projectSettings.name ?? "?";
    const tagline = settings.tagline ?? "";
    const version = projectSettings.version;
    const command = settings.command ?? name;
    const description = Array.isArray(settings.description) ?
        settings.description.join("\n") :
        settings.description;
    const usage = Array.isArray(settings.usage)?
        settings.usage :
        settings.usage? [settings.usage] :
        [`${command} [options] [arguments...]`];
    const examples = Array.isArray(settings.examples)?
        settings.examples.join("\n        ") :
        settings.examples;

    if (_command) {
        const commandHelp = await getCommandHelp(_command.split(" "));
        const args = commandHelp.args ?? [];
        const argsString = args.map(arg => {
            if (arg.endsWith("?")) return `[${arg.slice(0, -1)}]`;

            return `<${arg}>`;
        }).join(" ");

        console.log(StyleInfoMark("?"), commandHelp.tagline);
        console.log();

        console.log(StyleHighlight("Usage:"));
        console.log(StyleCommand(`    ${command} ${_command}`), argsString)

        if (commandHelp.description) {
            console.log();
            console.log(StyleHighlight("Description:"));
            console.log(commandHelp.description.split("\n").map(line => `    ${line}`).join("\n"));
        }
        
        if (commandHelp.notes && options.full) {
            console.log();
            console.log(StyleHighlight("Notes:"));
            commandHelp.notes.forEach(note => console.log("   ", StyleInfoMark("•"), note));
        }

        console.log();
        console.log("For a listing of all available commands, use", StyleCommand(`${command} help`) + ".");
        if (!options.full) {
            console.log("For an extensive explanation of the command, use", StyleCommand(`${command} help ${_command} --full`) + ".");
        }
        return;
    }

    console.log(`${name} - ${tagline} [Version ${version}]\n`);
    console.log(`Usage:  ${usage.join("\n        ")}\n`)
    console.log(description, "\n");
    examples && console.log(`Example:\n        ${examples}\n`);
    console.log(`For help with a specific command, use ${command} help [command].`);

    if (options.simple) console.log(`For a listing of all available commands, use ${command} help.`);
    if (options.simple) return;

    const existingCommands = await getExistingCommands();
    const commandsHelp = await Promise.all(existingCommands.map(command => getCommandHelp(command.split(" "))));
    
    console.log("");
    console.log("Commands:");
    console.log(
        existingCommands
            .map(command => `    ${command}`)
            .map((command, i) => commandsHelp[i]?.tagline? `${command} - ${commandsHelp[i].tagline}` : command)
            .join("\n")
    );
}