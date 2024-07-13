import "colors";
import { User } from "../../models/User.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      res.status(404).json({ error: "User not found" });
    }

    const isPasswordCorrect = bcryptjs.compareSync(password, user.password);

    if (!isPasswordCorrect) {
      res.status(400).json({ error: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "2d" }
    );

    res.status(200).json({ ...user, token });
  } catch (error) {
    res.status(500).json({ error: `Error logging in user: ${error.message}` });
    console.log(`Error logging in user: ${error}`.bgRed);
  }
};
