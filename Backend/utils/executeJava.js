import fs from "fs";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { execSync, spawn } from "child_process";
import getJavaFileName from "./getJavaFileName.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const executeJava = async (filePath, inputs, timeout = 7000) => { // Timeout set to 5 seconds by default
  try {
    const outputDirPath = path.join(__dirname, "outputs");

    if (!fs.existsSync(outputDirPath)) {
      fs.mkdirSync(outputDirPath, { recursive: true });
    }
    const javaOutputs = path.join(outputDirPath, "java");
    if (!fs.existsSync(javaOutputs)) {
      fs.mkdirSync(javaOutputs, { recursive: true });
    }

    return new Promise((resolve, reject) => {
      try {
        execSync(`javac ${filePath} -d ${javaOutputs}`);

        getJavaFileName(javaOutputs)
          .then((fileName) => {
            const fileClassName = fileName[0].split(".")[0];
            const child = spawn("java", [fileClassName], {
              cwd: javaOutputs,
            });

            let result = "";

            child.stdout.on("data", (data) => {
              result += data.toString();
            });

            child.stdout.on("end", () => {
              resolve(result.trim()); // Resolve with trimmed string
            });

            if (inputs) {
              child.stdin.write(inputs);
              child.stdin.end();
            }

            // Set a timeout to kill the process if it runs for longer than the specified duration
            setTimeout(() => {
              child.kill();
              resolve("Error : Time limit exceeded"); // Reject with an error indicating timeout
            }, timeout);
          })
          .catch((err) => {
            resolve("Error is finding Java file: " + err);
          });
      } catch (err) {
        resolve("Error is compiling Java file: " + err);
      }
    });
  } catch (e) {
    console.log(e);
    
  }
};

export default executeJava;
