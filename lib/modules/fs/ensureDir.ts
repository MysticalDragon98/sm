import executeShCommand from "../sh/executeShCommand";

export default async function ensureDir (path: string) {
    await executeShCommand(`mkdir -p "${path}"`);
}