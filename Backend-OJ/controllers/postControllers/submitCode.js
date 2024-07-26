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
    const inputPath = await inputFileGenerate(
      filePath,
      problem.testCases[0].input.join("\n").trim(),
      language
    );

    for (const [index, testCase] of problem.testCases.entries()) {
      const output = await checkCase(
        filePath,
        inputPath,
        testCase.input,
        language
      );

      if (output.error) {
        return res.status(500).json({ error: output.error.message });
      }

      console.log(output.bgGreen);

      if (output.trim() !== testCase.output.join("\n").trim()) {
        return res.status(200).json({ error: `Test case ${index + 1} failed` });
      }
    }

    return res.status(200).json({ success: "All test cases passed" });
  } catch (error) {
    console.log(`Error submitting code: ${error}`.bgRed);
    return res
      .status(500)
      .json({ error: `Error submitting code: ${error.message}` });
  }
};
