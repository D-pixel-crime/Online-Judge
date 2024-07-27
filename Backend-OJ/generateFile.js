import path from "path";
import fs from "fs";
import { v4 as uuid } from "uuid";
import { fileURLToPath } from "url";

// As __dirname only works with commonJS, we need to use fileURLToPath to get the __dirname
// const temp = fileURLToPath(import.meta.url);
const __dirname = path.resolve();

const codesDir = path.join(__dirname, "codes");

export const generateFile = async (code, extension, language) => {
  const jobId = uuid();

  try {
    if (!fs.existsSync(codesDir)) fs.mkdirSync(codesDir, { recursive: true });
    const langDir = path.join(codesDir, `${language}`);
    if (!fs.existsSync(langDir)) fs.mkdirSync(langDir, { recursive: true });

    const fileName = `${jobId}.${extension}`;
    const filePath = path.join(langDir, fileName);

    fs.writeFileSync(filePath, code);

    // console.log(filePath.bgMagenta);
    return filePath;
  } catch (error) {
    return { error };
  }
};
