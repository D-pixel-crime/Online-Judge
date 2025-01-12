import "colors";
import { exec } from "child_process";
import path from "path";
import { Problem } from "../../models/Problem.js";
import { generateFile } from "../../generateFile.js";
import fs from "fs";
import { inputFileGenerate } from "../../inputFileGenerate.js";
import { executeCPP } from "../../executeCPP.js";
import { executePython } from "../../executePython.js";
import { executeJS } from "../../executeJS.js";
import { deleteFile } from "../../deleteFile.js";

export const submitCode = async (req, res) => {
  const { code, extension, language } = req.body;
  const { problemId } = req.params;

  let filePath, inputPath;

  try {
    const problem = await Problem.findById(problemId);
    if (!problem) {
      return res.status(404).json({ error: "Problem not found" });
    }

    filePath = await generateFile(code, extension, language);
    inputPath = await inputFileGenerate(filePath, "", language);

    if (language === "cpp") {
      const __dirname = path.resolve();
      const cppDir = path.join(__dirname, "codes/cpp");
      const jobId = path.basename(filePath).split(".")[0];
      await new Promise((resolve, reject) => {
        exec(
          `cd ${cppDir} && g++ ${jobId}.cpp -o ${jobId}.out`,
          (error, stdout, stderr) => {
            if (error) {
              reject(`Compilation Error ${(error, stderr)}`);
            } else if (stderr) {
              reject(stderr);
            }
            resolve(stdout);
          }
        );
      });
    }

    let maxTime = 0;
    const timeLimit = problem.timeLimit || 1;

    for (const [index, testCase] of problem.testCases.entries()) {
      const strInput = testCase.input.join("\n");
      console.log(strInput);

      fs.writeFileSync(inputPath, strInput.trim());

      let output;
      let start, end;

      switch (language) {
        case "cpp":
          start = performance.now();
          output = await executeCPP(filePath, timeLimit);
          end = performance.now();
          break;

        case "python":
          start = performance.now();
          output = await executePython(filePath, timeLimit);
          end = performance.now();
          break;

        case "javascript":
          start = performance.now();
          output = await executeJS(filePath, timeLimit);
          end = performance.now();
          break;
      }

      if (output.error) {
        return res.status(500).json({ error: output.error.message });
      }

      maxTime = Math.max(maxTime, end - start);

      if (output.trim() !== testCase.output.join("\n").trim()) {
        return res.status(200).json({
          error: `Test case ${index + 1} failed`,
          runtime: `${Math.ceil(maxTime)} ms`,
        });
      }

      console.log(output.bgGreen);
    }

    deleteFile(filePath, inputPath, language);

    return res.status(200).json({
      success: "All test cases passed",
      runtime: `${Math.ceil(maxTime)} ms`,
    });
  } catch (error) {
    deleteFile(filePath, inputPath, language);

    if (error === "Time Limit Exceeded")
      return res.status(500).json({ error: "Time Limit Exceeded" });
    console.log(`Error submitting code: ${error}`.bgRed);
    return res.status(500).json({ error: error.message });
  }
};
