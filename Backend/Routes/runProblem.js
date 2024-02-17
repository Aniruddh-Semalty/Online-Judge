import { Router } from "express";
const router = Router();
import generateFile from "../utils/generateFile.js";
import executeFile from "../utils/executeFile.js";
import { cleanup } from "../utils/cleanup.js";
import executeCpp from "../utils/executecpp.js";

router.post("/", async (req, res) => {
  const { language = "cpp", code } = req.body;
  if (code === undefined || code === "") {
    res
      .status(404)
      .json({
        success: "failed",
        message: "please write code before running in the compiler",
      });
  }

  const filePath = await generateFile(language, code);

  let output = undefined;
  if (language == "cpp") {
    output = await executeCpp(filePath, language);
    await cleanup();
  } else {
    output = await executeFile(filePath, language);
  }

  res.status(200).json({ output });
});

export default router;
