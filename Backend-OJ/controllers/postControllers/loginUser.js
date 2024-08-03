import "colors";
import { User } from "../../models/User.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isPasswordCorrect = bcryptjs.compareSync(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "2d" }
    );

    const stringUserId = new mongoose.Types.ObjectId(user._id).toString();

    res.cookie("username", username, {
      maxAge: 1000 * 60 * 60 * 24 * 2,
      sameSite: "None",
      secure: true,
      domain: ".thinkxcode.online",
    });
    res.cookie("userId", stringUserId, {
      maxAge: 1000 * 60 * 60 * 24 * 2,
      sameSite: "None",
      secure: true,
      domain: ".thinkxcode.online",
    });
    res.cookie("token", token, {
      maxAge: 1000 * 60 * 60 * 24 * 2,
      sameSite: "None",
      secure: true,
      domain: ".thinkxcode.online",
    });

    return res.status(200).json({ token });
  } catch (error) {
    console.log(`Error logging in user: ${error}`.bgRed);
    return res
      .status(500)
      .json({ error: `Error logging in user: ${error.message}` });
  }
};
