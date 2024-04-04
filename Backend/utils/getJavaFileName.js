import fs from "fs";
const getJavaFileName = async (outputFilesPath) => {
  try {
    return await new Promise(async (resolve, reject) => {
      await fs.readdir(outputFilesPath, (err, files) => {
        if (err) {
          reject(err);
        } else {
          resolve(files.filter((file) => file.endsWith(".class")));
        }
      });
    });
  } catch (e) {
    console.log(e);
  }
};
export default getJavaFileName;
