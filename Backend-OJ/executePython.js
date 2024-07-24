import { fileURLToPath } from "url";
import path from "path";
import { exec } from "child_process";

const temp = fileURLToPath(import.meta.url);
const __dirname = path.dirname(temp);

let pythonDir = path.join(__dirname, "codes");
pythonDir = path.join(pythonDir, "python");

export const executePython = async (filePath) => {
  const file = path.basename(filePath);

  return new Promise((resolve, reject) => {
    exec(`cd ${pythonDir} && python ${file}`, (error, stdout, stderr) => {
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
