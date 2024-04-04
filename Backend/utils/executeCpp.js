import fs from "fs";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { exec, spawn } from "child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));

const executeCpp = async (filePath, inputs, timeout = 15000) => {
    try {
        const outputDirPath = path.join(__dirname, "outputs");

        if (!fs.existsSync(outputDirPath)) {
            fs.mkdirSync(outputDirPath, { recursive: true });
        }

        const cppOutputs = path.join(outputDirPath, "cpp");
        if (!fs.existsSync(cppOutputs)) {
            fs.mkdirSync(cppOutputs, { recursive: true });
        }

        const fileName = path.basename(filePath).split(".")[0];
        const execFile = `${fileName}.exe`;
        const outputPath = path.join(cppOutputs, execFile);

        return new Promise((resolve, reject) => {
            exec(`g++ -O2 ${filePath} -o ${outputPath}`, (error, stdout, stderr) => {
                if (error || stderr) {
                    reject(new Error("Compilation Error"));
                    return;
                }

                if (!fs.existsSync(outputPath)) {
                    reject(new Error("Compiled executable not found"));
                    return;
                }

                const child = spawn(outputPath);
                if (inputs != null) {
                    child.stdin.write(inputs);
                    child.stdin.end();
                }

                let result = "";
                child.stdout.on("data", (data) => {
                    result += data.toString();
                });

                child.stdout.on("end", () => {
                    resolve(result.trim());
                });

                child.on("error", (error) => {
                    reject(new Error("Execution Error"));
                });

                // Set a timeout to terminate the child process if it runs for longer than specified
                setTimeout(() => {
                    if (child.exitCode === null) { // Check if the process is still running
                        child.kill(); // Terminate the child process
                        reject(new Error("Execution Timeout"));
                    }
                }, timeout);
            });
        });
    } catch (e) {
        console.error(e);
        throw e;
    }
};

export default executeCpp;
