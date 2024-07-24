import path from "path";
import fs from "fs";
import { v4 as uuid } from "uuid";
import { fileURLToPath } from "url";

// As __dirname only works with commonJS, we need to use fileURLToPath to get the __dirname
const temp = fileURLToPath(import.meta.url);
const __dirname = path.dirname(temp);

const codesDir = path.join(__dirname, "codes");

export const generateFile = async (code, extension, language) => {
  const jobId = uuid();

  try {
    fs.mkdirSync(codesDir, { recursive: true });
    const langDir = path.join(codesDir, `${language}`);
    fs.mkdirSync(langDir, { recursive: true });

    const fileName = `${jobId}.${extension}`;
    const filePath = path.join(langDir, fileName);

    fs.writeFileSync(filePath, code);

    console.log(filePath.bgGreen);
    return filePath;
  } catch (error) {
    return error;
  }
};
