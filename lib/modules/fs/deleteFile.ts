import executeShCommand from "../sh/executeShCommand";

export default async function deleteFile (path: string) {
    return await executeShCommand(`rm -rf "${path}"`);
}