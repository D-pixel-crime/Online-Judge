import { User } from "../../models/User.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import "colors";
import mongoose from "mongoose";

export const registerNewUser = async (req, res) => {
  console.log(req.body);
  const { fullName, username, password, email } = req.body;
  try {
    const isUsernamePresent = await User.findOne({ username });
    if (isUsernamePresent) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const isEmailPresent = await User.findOne({ email });
    if (isEmailPresent) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPass = bcryptjs.hashSync(password, 10);

    const userCreated = await User.create({
      username,
      email,
      password: hashedPass,
      fullName,
    });

    const token = jwt.sign(
      { id: userCreated._id, email },
      process.env.JWT_SECRET,
      {
        expiresIn: "2d",
      }
    );

    const stringUserId = new mongoose.Types.ObjectId(
      userCreated._id
    ).toString();

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
    console.log(`Error registering new user: ${error}`.bgRed);
    return res
      .status(500)
      .json({ error: `Error registering new user: ${error.message}` });
  }
};
