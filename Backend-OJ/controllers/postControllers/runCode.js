import "colors";
import { generateFile } from "../../generateFile.js";
import { executeCPP } from "../../executeCPP.js";
import { executePython } from "../../executePython.js";
import { executeJS } from "../../executeJS.js";
import { inputFileGenerate } from "../../inputFileGenerate.js";

export const runCode = async (req, res) => {
  const { code, extension, language, input } = req.body;

  try {
    const filePath = await generateFile(code, extension, language, input);
    if (input) await inputFileGenerate(filePath, input, language);

    let output;
    switch (language) {
      case "cpp":
        output = await executeCPP(filePath);
        break;

      case "python":
        output = await executePython(filePath);
        break;

      case "javascript":
        output = await executeJS(filePath);
        break;
    }

    if (output.error) {
      return res.status(500).json({ error: output.error.message });
    }

    res.status(200).json({ output });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
