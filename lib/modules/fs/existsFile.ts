import { access } from "fs/promises";

export default async function existsFile (path: string) {
    try {
        await access(path);
        return true;
    } catch (error) {
        return false;
    }
}