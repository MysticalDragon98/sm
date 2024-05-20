import { exec } from "child_process";

export default async function deleteFile (path: string) {
    return await exec(`rm -rf "${path}"`);
}