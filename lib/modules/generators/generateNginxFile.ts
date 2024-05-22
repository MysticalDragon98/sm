import { NginxConfig } from "../../types/NginxConfig.type";
import { ServiceConfig } from "../../types/ServiceConfig.type";
import parseHandlebarsTemplate from "../templates/parseHandlebarsTemplate";

export default async function generateNginxFile (config: ServiceConfig) {
    
    return await parseHandlebarsTemplate("nginx.conf", <NginxConfig> {
        server: {
            server_name: config.network.domain,
            location: {
                proxy_pass: `http://127.0.0.1:${config.network.port}`
            },
            mappings: Object.entries(config.network.mappings ?? {}).map(([endpoint, proxy_pass]) => ({
                endpoint: `/${endpoint}`,
                proxy_pass: `http://127.0.0.1:${proxy_pass}`
            })),
            listen: "443",
            ssl_certificate: config.ssl.fullchain ?? `/etc/letsencrypt/live/${config.network.domain}/fullchain.pem`,
            ssl_certificate_key: config.ssl.privkey ?? `/etc/letsencrypt/live/${config.network.domain}/privkey.pem`,
            include: `/etc/letsencrypt/options-ssl-nginx.conf`,
            ssl_dhparam: `/etc/letsencrypt/ssl-dhparams.pem`, 
        }
    })
}