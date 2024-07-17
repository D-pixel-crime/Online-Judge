import "colors";
import { Problem } from "../../models/Problem.js";

export const searchProblems = async (req, res) => {
  const { search } = req.body;

  try {
    const data = await Problem.find({
      title: { $regex: search, $options: "i" },
    }).populate("author", "username");

    const problems = data.map((eachProblem) => {
      return {
        title: eachProblem.title,
        _id: eachProblem._id,
        author: {
          username: eachProblem.author.username,
        },
      };
    });

    return res.status(200).json({ problems });
  } catch (error) {
    console.log(`Error searching for problems: ${error}`.bgRed);
    return res
      .status(500)
      .json({ error: `Error during search: ${error.message}` });
  }
};
