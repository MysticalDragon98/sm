import { exec } from "child_process";
import { log } from "termx";

export default async function ensureDir (path: string) {
    await exec(`mkdir -p "${path}"`);
}