import "colors";
import { User } from "../../models/User.js";
import { Problem } from "../../models/Problem.js";

export const fetchUserProfile = async (req, res) => {
  const userId = req.cookies.userId;

  try {
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const problems = await Problem.find({ author: userId });

    return res.status(200).json({
      username: user.username,
      email: user.email,
      fullName: user.fullName,
      problems: problems,
    });
  } catch (error) {
    console.log(`Error fetching user profile: ${error}`.bgRed);
    return res
      .status(500)
      .json({ error: `Error fetching user profile: ${error.message}` });
  }
};
