import { ServiceConfig } from "../../types/ServiceConfig.type";
import { SystemServiceConfig } from "../../types/SystemServiceConfig.type";
import parseHandlebarsTemplate from "../templates/parseHandlebarsTemplate";

export default async function generateSystemServiceFile (config: ServiceConfig) {
    return await parseHandlebarsTemplate("service.toml", <SystemServiceConfig> {
        Unit: {
            Description: config.description ?? "",
            After: config.service.autostart ? "network.target" : "",
            StartLimitIntervalSec: 5
        },

        Service: {
            Type: "simple",
            Environment: "",
            Restart: config.service.autorestart ? "always" : "no",
            RestartSec: 1,
            ExecStart: config.commands?.start ?? "make start",
            WorkingDirectory: config.cwd,
            User: config.service.user ?? config.name,
        },

        Install: {
            WantedBy: "multi-user.target"
        }
    })
}