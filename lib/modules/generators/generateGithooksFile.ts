import { GithooksConfig } from "../../types/GithooksConfig.type";
import { ServiceConfig } from "../../types/ServiceConfig.type";
import parseHandlebarsTemplate from "../templates/parseHandlebarsTemplate";

export default async function generateGithooksFile (config: ServiceConfig) {
    return await parseHandlebarsTemplate("githooks.toml", <GithooksConfig> {
        dir: config.cwd,
        branch: config.git.branch ?? "master",
        cmd: config.commands?.update ?? "make update"
    })
}