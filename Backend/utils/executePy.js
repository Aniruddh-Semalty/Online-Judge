import { exec,spawn } from "child_process";

const executePy = async (filePath, language, inputs) => {
 
  if (language == "py") {
    return await new Promise((resolve, reject) => {
      const pythonProcess = spawn("python", [filePath]);
        if(inputs){
        pythonProcess.stdin.write(inputs);
        pythonProcess.stdin.end();
        }
        let result = "";
        pythonProcess.stdout.on("data", (data) => {
          result += data.toString();
        });
        pythonProcess.stderr.on("data", (data) => {
         reject(`Error from Python: ${data.toString()}`);
        });
        // pythonProcess.stdout.on("end", () => {
        //   resolve(result.trim()); // Resolve with trimmed string
        // });
        pythonProcess.on("exit", (code) => {
          if (code !== 0) {
            reject(`Python process exited with code ${code}`);
          } else {
            resolve(result.trim());
          }
        });
      
    });
  }
};
export default executePy;
