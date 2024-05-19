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
    };

    network: {
        port?: number;
        domain?: string;
    };

    githooks: {
        branch?: string;
    };

    ssl: {
        fullchain?: string;
        privkey?: string;
    }

    commands: Record<string, string>;
}