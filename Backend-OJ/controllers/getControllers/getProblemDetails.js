import { Problem } from "../../models/Problem.js";

export const getProblemDetails = async (req, res) => {
  const { problemId } = req.params;

  try {
    const problem = await Problem.findById(problemId).populate(
      "author",
      "username"
    );

    if (!problem) {
      return res.status(404).json({ error: "Problem not found" });
    }

    return res.status(200).json({ problem });
  } catch (error) {
    console.log(`Error fetching problem details: ${error}`.bgRed);
    return res.status(500).json({ error: error.message });
  }
};
