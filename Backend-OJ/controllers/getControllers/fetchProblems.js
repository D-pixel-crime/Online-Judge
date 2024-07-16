import "colors";
import { Problem } from "../../models/Problem.js";

export const fetchProblems = async (req, res) => {
  try {
    const problems = await Problem.find({});

    return res.status(200).json({ problems });
  } catch (error) {
    console.log(`Problems could not be fetched:${error}`.bgRed);
    return res.status(500).json({ error: error.message });
  }
};
