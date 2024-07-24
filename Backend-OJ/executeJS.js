import { fileURLToPath } from "url";
import path from "path";
import { exec } from "child_process";

const temp = fileURLToPath(import.meta.url);
const __dirname = path.dirname(temp);

let jsDir = path.join(__dirname, "codes");
jsDir = path.join(jsDir, "javascript");

export const executeJS = async (filePath) => {
  const file = path.basename(filePath);

  return new Promise((resolve, reject) => {
    exec(`cd ${jsDir} && node ${file}`, (error, stdout, stderr) => {
      if (error) {
        reject(error, stderr);
      }
      if (stderr) {
        reject(stderr);
      }
      resolve(stdout);
    });
  });
};
