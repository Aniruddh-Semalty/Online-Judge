import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { exec } from "child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputDirPath = path.join(__dirname, "outputs");
const codesDirPath = path.join(__dirname, "codes");

export const cleanup = () => {
  try {
    return new Promise((resolve, reject) => {
      exec(
        `if [ -d "${outputDirPath}" ]; then rm -rf ${outputDirPath}; fi; if [ -d "${codesDirPath}" ]; then rm -rf ${codesDirPath}; fi`,
        (error, stderr, stdout) => {
          if (error) {
            reject(error);
          } else if (stderr) {
            reject(stderr);
          } else {
            resolve(stdout);
          }
        }
      );
    });
  } catch (e) {
    console.log(e);
  }
};

