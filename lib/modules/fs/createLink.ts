import { symlink } from "fs/promises";

export default async function createLink (source: string, target: string) {
    return await symlink(source, target);
}