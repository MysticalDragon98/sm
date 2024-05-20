import { exec } from "child_process";

export default async function executeShCommand (command: string, { cwd }: { cwd?: string } = {}) {
    return new Promise((resolve, reject) => {
        // Execute the command
        exec(command, { cwd }, (error, stdout, stderr) => {
          if (error) {
            reject(`Error executing command ${command}: ${error}`);
            return;
          }
    
          // Resolve the promise with the command's stdout
          resolve(stdout);
        });
      });
}
