export type ServiceConfig = {
    name: string;
    cwd: string;
    repo?: string;
    description?: string;

    service: {
        autostart?: boolean;
        autorestart?: boolean;
        user?: string;
    };

    network?: {
        port?: number;
        domain?: string;
    };

    githooks?: {
        enable?: boolean;
    };

    commands?: Record<string, string>;
}