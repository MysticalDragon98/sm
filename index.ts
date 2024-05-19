#!/usr/bin/env node

import initCLI from "./plugins/cli/initCLI";

//* Imports

async function main () {
    await Promise.all([
    ]);

    
    initCLI({
        boolean: [],
    })
}

main();

process.on('uncaughtException', console.log);
process.on('unhandledRejection', console.log);