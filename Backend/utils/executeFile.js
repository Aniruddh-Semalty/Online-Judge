import { exec,spawn } from "child_process";

const executeFile = async (filePath, language, inputs) => {
 
  if (language == "js") {
    return await new Promise((resolve, reject) => {
     const jsProcess=spawn("node",[filePath]);
     if(inputs){
     jsProcess.stdin.write(inputs);
     jsProcess.stdin.end();
     }
     let result="";
     jsProcess.stdout.on("data",(data)=>{
      result+=data.toString();
     })
     console.log(result)
     jsProcess.stderr.on("data",(data)=>{
      reject(data.toString());
     })
     jsProcess.stdout.on("data",(data)=>{
      resolve(result.trim());
     })
    });
  } else if (language == "py") {
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
        pythonProcess.stdout.on("end", () => {
          resolve(result.trim()); // Resolve with trimmed string
        });
      
    });
  }
};
export default executeFile;
