import "colors";
import { User } from "../../models/User.js";

export const fetchUserProfile = async (req, res) => {
  const userId = req.cookies.userId;
  console.log(userId);

  try {
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.log(`Error fetching user profile: ${error}`.bgRed);
    return res
      .status(500)
      .json({ error: `Error fetching user profile: ${error.message}` });
  }
};
