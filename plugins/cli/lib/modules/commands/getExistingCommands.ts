import { readdir } from "fs/promises";
import { resolve } from "path";

export default async function getExistingCommands (subFolder: string = "") {
    const rootPath = resolve(__dirname, "../../../../../lib/cli/commands/" + subFolder);
    const rootFolder = await readdir(rootPath);

    const commands = rootFolder
        .filter(file => file.endsWith(".cli-command.ts"))
        .map(file => file.replace(".cli-command.ts", ""));
    
    const folders = rootFolder.filter(file => !file.endsWith(".cli-command.ts"));
    const subFoldersCommands = (
        await Promise.all(
            folders.map(async folder => {
                const commands = await getExistingCommands(subFolder ? subFolder + "/" + folder : folder)

                return commands.map(command => `${folder} ${command}`)
            })
        )
    );
    
    return [
        ...commands,
        ...subFoldersCommands.flat()
    ];
}