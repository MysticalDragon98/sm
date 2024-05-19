import { readFile } from "fs/promises";
import { join } from "path";
import { IProjectSettings } from "../../interfaces/ProjectSettings.interface";

export async function loadProjectSettings () {
    return JSON.parse(await readFile(join(__dirname, "../../../../../../project.json"), "utf-8")) as IProjectSettings;
}