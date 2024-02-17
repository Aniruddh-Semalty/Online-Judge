import { exec } from "child_process";

const executeFile = async (filePath, language) => {
  if (language == "js") {
    return await new Promise((resolve, reject) => {
      exec(`node ${filePath}`, (error, stdout, stderr) => {
        if (error) {
          reject(error);
        } else if (stderr) {
          reject(stderr);
        } else {
          resolve(stdout);
        }
      });
    });
  } else if (language == "py") {
    return await new Promise((resolve, reject) => {
      exec(`py ${filePath}`, (error, stdout, stderr) => {
        if (error) {
          reject(error);
        }
        if (stderr) {
          reject(stderr);
        }
        resolve(stdout);
      });
    });
  }
};
export default executeFile;
