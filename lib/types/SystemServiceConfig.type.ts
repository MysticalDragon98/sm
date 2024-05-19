export type SystemServiceConfig = {
    Unit: {
        Description: string;
        After: string;
        StartLimitIntervalSec: number;
    }

    Service: {
        Type: string;
        Environment: string;
        Restart: string;
        RestartSec: number;
        User: string;
        ExecStart: string;
        WorkingDirectory: string;
    };

    Install: {
        WantedBy: string;
    };
}