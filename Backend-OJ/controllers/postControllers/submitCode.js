import "colors";
import { Problem } from "../../models/Problem.js";
import { generateFile } from "../../generateFile.js";
import { checkCase } from "../../checkCase.js";
import { inputFileGenerate } from "../../inputFileGenerate.js";

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
      const data = await checkCase(
        filePath,
        inputPath,
        testCase.input,
        language
      );

      if (data.output.error) {
        return res.status(500).json({ error: data.error.message });
      }

      maxTime = Math.max(maxTime, data.runtime);

      if (data.output !== testCase.output.join("\n").trim()) {
        return res.status(200).json({
          error: `Test case ${index + 1} failed`,
          runtime: `${maxTime} ms`,
        });
      }

      console.log(data.output.bgGreen);
    }

    return res.status(200).json({
      success: "All test cases passed",
      runtime: `${maxTime} ms`,
    });
  } catch (error) {
    console.log(`Error submitting code: ${error}`.bgRed);
    return res.status(500).json({ error: `Error submitting code` });
  }
};
