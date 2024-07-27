import path from "path";
import fs from "fs";
import { v4 as uuid } from "uuid";

const __dirname = path.resolve();

export const generateFile = async (code, extension, language) => {
  const codesDir = path.join(__dirname, "codes");
  const jobId = uuid();

  try {
    if (!fs.existsSync(codesDir)) fs.mkdirSync(codesDir, { recursive: true });
    const langDir = path.join(codesDir, `${language}`);
    if (!fs.existsSync(langDir)) fs.mkdirSync(langDir, { recursive: true });

    const fileName = `${jobId}.${extension}`;
    const filePath = path.join(langDir, fileName);

    fs.writeFileSync(filePath, code);

    console.log(filePath.bgMagenta);
    return filePath;
  } catch (error) {
    return { error };
  }
};
