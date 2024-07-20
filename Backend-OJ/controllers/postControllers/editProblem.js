import { Problem } from "../../models/Problem.js";
import "colors";

export const editProblem = async (req, res) => {
  const { problemId } = req.params;
  const { title, description, testCases } = req.body;

  if (
    JSON.stringify(testCases[testCases.length - 1].input) ===
      JSON.stringify([""]) &&
    JSON.stringify(testCases[testCases.length - 1].output) ===
      JSON.stringify([""])
  ) {
    testCases.pop();
  }

  try {
    const data = await Problem.findByIdAndUpdate(
      problemId,
      { title, description, testCases },
      { new: true }
    );

    if (!data) {
      return res.status(404).json({ error: "Problem not found" });
    }

    return res.status(200).json({ success: "Problem edited successfully" });
  } catch (error) {
    console.log(`Error editing problem: ${error}`.bgRed);
    return res.status(500).json({ error: error.message });
  }
};
