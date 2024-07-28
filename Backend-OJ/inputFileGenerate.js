import fs from "fs";
import path from "path";

const __dirname = path.resolve();

export const inputFileGenerate = async (filePath, input, language) => {
  let langDir = path.join(__dirname, `codes/${language}`);

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
