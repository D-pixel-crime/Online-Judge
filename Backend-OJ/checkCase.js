import fs from "fs";
import { executePython } from "./executePython.js";
import { executeJS } from "./executeJS.js";
import { executeCPP } from "./executeCPP.js";

export const checkCase = async (filePath, inputPath, input, language) => {
  const strInput = input.join("\n");
  console.log(strInput);

  try {
    fs.writeFileSync(inputPath, strInput.trim());

    let output;
    let start, end;

    switch (language) {
      case "cpp":
        start = performance.now();
        output = await executeCPP(filePath);
        end = performance.now();
        break;

      case "python":
        start = performance.now();
        output = await executePython(filePath);
        end = performance.now();
        break;

      case "javascript":
        start = performance.now();
        output = await executeJS(filePath);
        end = performance.now();
        break;
    }

    return { output, runtime: Math.ceil(end - start) };
  } catch (error) {
    return { error };
  }
};
