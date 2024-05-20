import executeShCommand from "../sh/executeShCommand";

export default async function createLink (source: string, target: string) {
    return await executeShCommand(`ln -s "${source}" "${target}"`);
}