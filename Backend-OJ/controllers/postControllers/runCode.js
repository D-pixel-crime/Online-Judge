import "colors";
import path from "path";
import { exec } from "child_process";
import { generateFile } from "../../generateFile.js";
import { executeCPP } from "../../executeCPP.js";
import { executePython } from "../../executePython.js";
import { executeJS } from "../../executeJS.js";
import { inputFileGenerate } from "../../inputFileGenerate.js";
import { deleteFile } from "../../deleteFile.js";

export const runCode = async (req, res) => {
  const { code, extension, language, input } = req.body;
  let filePath;

  try {
    filePath = await generateFile(code, extension, language, input);
    if (input) await inputFileGenerate(filePath, input, language);

    let output;
    switch (language) {
      case "cpp":
        const __dirname = path.resolve();
        const cppDir = path.join(__dirname, "codes/cpp");
        const jobId = path.basename(filePath).split(".")[0];
        await new Promise((resolve, reject) => {
          exec(
            `cd ${cppDir} && g++ ${jobId}.cpp -o ${jobId}.out`,
            (error, stdout, stderr) => {
              if (error) {
                reject(`Compilation Error ${(error, stderr)}`);
              } else if (stderr) {
                reject(stderr);
              }
              resolve(stdout);
            }
          );
        });
        output = await executeCPP(filePath);
        break;

      case "python":
        output = await executePython(filePath);
        break;

      case "javascript":
        output = await executeJS(filePath);
        break;
    }

    deleteFile(filePath, input, language);

    if (output.error) {
      return res.status(500).json({ error: output.error });
    }

    res.status(200).json({ output });
  } catch (error) {
    deleteFile(filePath, input, language);
    console.log(error);
    if (error === "Time Limit Exceeded")
      return res.status(500).json({ error: "Time Limit Exceeded" });
    return res.status(500).json({ error: error.message });
  }
};
