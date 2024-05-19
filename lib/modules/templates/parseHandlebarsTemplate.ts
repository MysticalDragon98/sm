import { readFile } from "fs/promises";
import { compile } from "handlebars";
import { resolve } from "path";


export default async function parseHandlebarsTemplate (template: string, data: any) {
    const handlebars = compile(await readFile(resolve(__dirname, "../../templates/" + template), "utf-8"));

    return handlebars(data);
}