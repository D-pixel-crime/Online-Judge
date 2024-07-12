import { User } from "../../models/User.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import "colors";

export const registerNewUser = async (req, res) => {
  const { fullName, username, password, email } = req.body;
  try {
    const isUsernamePresent = await User.findOne({ username });
    const isEmailPresent = await User.findOne({ email });

    if (isUsernamePresent) {
      return res.status(400).json({ error: "Username already exists" });
    }
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

    res.status(200).json({ ...userCreated, token });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Error registering new user: ${error.message}` });
    console.log(`Error registering new user: ${error}`.bgRed);
  }
};
