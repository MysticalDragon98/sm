import { unlink } from "fs/promises";

export default async function deleteFile (path: string) {
    return await unlink(path);
}