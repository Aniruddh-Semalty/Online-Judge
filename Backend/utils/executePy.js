import { spawn } from "child_process";

const executePy = async (filePath, inputs, timeout = 7000) => {
  try {
    const inputsArr = inputs.split(" ");
    let inputString = "";
    inputsArr.map((ip) => {
      inputString += ip;
      inputString += "\n";
    });

    try {
      const result = await new Promise((resolve, reject) => {
        const pythonProcess = spawn("python", [filePath]);

        if (inputs) {
          pythonProcess.stdin.write(inputString);
          pythonProcess.stdin.end();
        }

        let result = "";
        let timedOut = false;

        pythonProcess.stdout.on("data", (data) => {
          result += data.toString();
        });

        pythonProcess.stderr.on("data", (data) => {
          reject(new Error(data));
        });

        pythonProcess.on("exit", (code) => {
          if (code !== 0) {
            reject(`Python process exited with code ${code}`);
          } else {
            resolve(result.trim());
          }
        });

        setTimeout(() => {
          timedOut = true;
          pythonProcess.kill(); // Kill the process if it runs for longer than timeout
          reject("Python process timed out");
        }, timeout);
      });

      return result;
    } catch (error) {
      console.log("Error executing Python script:", error);
      throw error; // Re-throw the error to propagate it further if needed
    }
  } catch (e) {
    console.log("Error executing Python script:", e);
    throw e;
  }
};

export default executePy;
