import { exec } from "child_process";

export default async function ensureDir (path: string) {
    await exec(`mkdir -p "${path}"`);
}