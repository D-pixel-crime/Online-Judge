import "colors";
import { generateFile } from "../../generateFile.js";

export const runCode = async (req, res) => {
  const { code, extension, language } = req.body;

  try {
    const filePath = await generateFile(code, extension, language);

    console.log(filePath.bgGreen);

    res.status(200).json({ message: "Code saved successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
