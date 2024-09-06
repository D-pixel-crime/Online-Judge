import path from "path";
import fs from "fs";

const __dirname = path.resolve();

export const deleteFile = async (filePath, input, language) => {
  const langDir = path.join(__dirname, `codes/${language}`);

  try {
    fs.unlinkSync(filePath);

    if (input) {
      const inputPath = path.join(
        langDir,
        `${path.basename(filePath).split(".")[0]}.txt`
      );
      fs.unlinkSync(inputPath);
    }
    if (language === "cpp") {
      const execPath = path.join(
        langDir,
        `${path.basename(filePath).split(".")[0]}.exe`
      );
      fs.unlinkSync(execPath);
    }
  } catch (error) {
    return { error };
  }
};
