import "colors";
import { Problem } from "../../models/Problem.js";

export const createProblem = async (req, res) => {
  const { title, description, testCases } = req.body;
  const userId = req.cookies.userId;
  if (
    JSON.stringify(testCases[testCases.length - 1].input) ===
      JSON.stringify([""]) &&
    JSON.stringify(testCases[testCases.length - 1].output) ===
      JSON.stringify([""])
  ) {
    testCases.pop();
  }

  try {
    const problem = await Problem.create({
      title,
      description,
      testCases,
      author: userId,
    });

    return res.status(200).json({ problem });
  } catch (error) {
    console.log(`Problem could not be created: ${error}`.bgRed);
    return res.status(500).json({ error: error.message });
  }
};
