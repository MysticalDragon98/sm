export type NginxConfig = {
    server: {
        server_name: string;
        location: {
            proxy_pass: string;
        };

        listen: string;
        ssl_certificate: string;
        ssl_certificate_key: string;
        include: string;
    }
}