import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const temp = fileURLToPath(import.meta.url);
const __dirname = path.dirname(temp);

let langDir = path.join(__dirname, "codes");

export const inputFileGenerate = async (filePath, input, language) => {
  langDir = path.join(langDir, `${language}`);
  const jobId = path.basename(filePath).split(".")[0];
  const inputFilePath = path.join(langDir, `${jobId}.txt`);

  try {
    fs.writeFileSync(inputFilePath, input);

    console.log(inputFilePath.bgYellow);

    return inputFilePath;
  } catch (error) {
    return { error };
  }
};
