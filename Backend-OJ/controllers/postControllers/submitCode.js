import "colors";
import { Problem } from "../../models/Problem.js";
import { generateFile } from "../../generateFile.js";
import fs from "fs";
import { inputFileGenerate } from "../../inputFileGenerate.js";
import { executeCPP } from "../../executeCPP.js";
import { executePython } from "../../executePython.js";
import { executeJS } from "../../executeJS.js";

export const submitCode = async (req, res) => {
  const { code, extension, language } = req.body;
  const { problemId } = req.params;

  try {
    const problem = await Problem.findById(problemId);
    if (!problem) {
      return res.status(404).json({ error: "Problem not found" });
    }

    const filePath = await generateFile(code, extension, language);
    const inputPath = await inputFileGenerate(filePath, "", language);

    let maxTime = 0;

    for (const [index, testCase] of problem.testCases.entries()) {
      const strInput = testCase.input.join("\n");
      console.log(strInput);

      fs.writeFileSync(inputPath, strInput.trim());

      let output;
      let start, end;

      switch (language) {
        case "cpp":
          start = performance.now();
          output = await executeCPP(filePath);
          end = performance.now();
          break;

        case "python":
          start = performance.now();
          output = await executePython(filePath);
          end = performance.now();
          break;

        case "javascript":
          start = performance.now();
          output = await executeJS(filePath);
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

    return res.status(200).json({
      success: "All test cases passed",
      runtime: `${Math.ceil(maxTime)} ms`,
    });
  } catch (error) {
    console.log(`Error submitting code: ${error}`.bgRed);
    return res.status(500).json({ error: error.message });
  }
};
