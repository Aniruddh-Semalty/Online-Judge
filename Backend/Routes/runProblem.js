import { Router } from "express";
const router = Router();
import generateFile from "../utils/generateFile.js";
import executePy from "../utils/executePy.js";
import { cleanup } from "../utils/cleanup.js";
import executeCpp from "../utils/executecpp.js";
import executeJava from "../utils/executeJava.js";
import testcases from "../Models/testcase.model.js";
import submitProblem from "../utils/submitProblem.js";
router.post("/", async (req, res) => {
  const {
    username=null,
    probId = null,
    language = "cpp",
    code,
    inputs = null,
    submit,
  } = req.body;


  if (code === undefined || code === "") {
    res.status(404).json({
      success: "failed",
      message: "please write code before running in the compiler",
    });
  }

  let testcasesArr;
  let outputArr;
  if (submit) {
    const testcase = await testcases.findOne({
      problemId: probId,
    });
    testcasesArr = testcase.input;
    outputArr = testcase.output;
  }
  const filePath = await generateFile(language, code);

  if (language == "cpp") {
    if (submit) {
      //if submit button is clicked
      for (let i = 0; i < testcasesArr.length; i++) {
        const inputs = testcasesArr[i];
        const expectedOutput = outputArr[i];

        const output = await executeCpp(filePath, inputs);

        if (output.trim() !== expectedOutput.trim()) {
          return res.status(200).json({
            verdict: "failed",
            msg: `Failed at testcase no. ${
              i + 1
            } => Testcase input is ${inputs} .
       Your output  is ${output}. 
         Expected output is ${expectedOutput}.`,
          });
        }
      }
      await cleanup();
      submitProblem(probId,username,code);
      return res
        .status(200)
        .json({ verdict: "success", msg: "All the testcases passed" });
    } else {
      //if run button is clicked
      const output = await executeCpp(filePath, inputs);
      await cleanup();
      res.status(200).json({ output });
    }
  } else if (language == "py") {
    if (submit) {
      for (let i = 0; i < testcasesArr.length; i++) {
        const inputs = testcasesArr[i];
        const expectedOutput = outputArr[i];

        const output = await executePy(filePath, inputs);

        if (output.trim() !== expectedOutput.trim()) {
          return res.status(200).json({
            verdict: "failed",
            msg: `Failed at testcase no. ${
              i + 1
            } => Testcase input is ${inputs} .
       Your output  is ${output}. 
         Expected output is ${expectedOutput}.`,
          });
        }
      }
      submitProblem(probId,username,code);
      return res
        .status(200)
        .json({ verdict: "success", msg: "All the testcases passed" });
    } else {
      const output = await executePy(filePath, inputs);
    
      res.status(200).json({ output });
    }
  } else {
    if (submit) {
      for (let i = 0; i < testcasesArr.length; i++) {
        const inputs = testcasesArr[i];
        const expectedOutput = outputArr[i];

        const output = await executeJava(filePath, inputs);

        if (output.trim() !== expectedOutput.trim()) {
          return res.status(200).json({
            verdict: "failed",
            msg: `Failed at testcase no. ${
              i + 1
            } => Testcase input is ${inputs} .
       Your output  is ${output}. 
         Expected output is ${expectedOutput}.`,
          });
        }
      }
      await cleanup();
      submitProblem(probId,username,code);
      return res
        .status(200)
        .json({ verdict: "success", msg: "All the testcases passed" });
    } else {
      const output = await executeJava(filePath, inputs);
      await cleanup();
      res.status(200).json({ output });
    }
  }
});

export default router;
