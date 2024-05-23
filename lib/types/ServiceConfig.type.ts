export type ServiceConfig = {
    name: string;
    cwd: string;
    description?: string;

    git: {
        repo?: string;
        branch?: string;
    }

    service: {
        autostart?: boolean;
        autorestart?: boolean;
        user?: string;
        enabled?: boolean;
    };

    network: {
        port?: number;
        domain?: string;

        mappings?: Record<string, string>;
    };

    nginx?: {
        enabled?: boolean;
    };

    githooks: {
        branch?: string;
        enabled?: boolean;
    };

    ssl: {
        fullchain?: string;
        privkey?: string;
    }

    commands: Record<string, string>;
}