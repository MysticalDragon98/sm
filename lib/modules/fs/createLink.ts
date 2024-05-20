import { exec } from "child_process";

export default async function createLink (source: string, target: string) {
    return await exec(`ln -s "${source}" "${target}"`);
}