import "colors";
import { Problem } from "../../models/Problem.js";

export const deleteProblem = async (req, res) => {
  const { problemId } = req.params;

  try {
    const data = await Problem.findByIdAndDelete(problemId);

    if (!data) {
      return res.status(404).json({ error: "Problem not found" });
    }

    return res.status(200).json({ success: "Problem deleted successfully" });
  } catch (error) {
    console.log(`Error deleting problem: ${error}`.bgRed);
    return res.status(500).json({ error: error.message });
  }
};
