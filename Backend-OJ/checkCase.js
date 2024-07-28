import fs from "fs";
import { executePython } from "./executePython.js";
import { executeJS } from "./executeJS.js";
import { executeCPP } from "./executeCPP.js";

export const checkCase = async (filePath, inputPath, input, language) => {
  const strInput = input.join("\n");
  console.log(strInput);

  try {
    fs.writeFileSync(inputPath, strInput.trim());

    switch (language) {
      case "cpp":
        return executeCPP(filePath);

      case "python":
        return executePython(filePath);

      case "javascript":
        return executeJS(filePath);
    }
  } catch (error) {
    return { error };
  }
};
