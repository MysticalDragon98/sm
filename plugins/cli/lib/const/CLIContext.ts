const CLIContext = {
    json: false,
    raw: false,
    silent: false,
    tty: process.stdout.isTTY,
};

export default CLIContext;