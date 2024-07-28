import path from "path";
import { exec } from "child_process";
import fs from "fs";

const __dirname = path.resolve();

export const executeJS = async (filePath) => {
  const jsDir = path.join(__dirname, "codes/javascript");
  const jobId = path.basename(filePath).split(".")[0];

  const isInput = fs.existsSync(`${jsDir}/${jobId}.txt`);

  return new Promise((resolve, reject) => {
    exec(
      `cd ${jsDir} && node ${jobId}.js ${isInput ? `< ${jobId}.txt` : ""}`,
      (error, stdout, stderr) => {
        if (error) {
          reject(error, stderr);
        }
        if (stderr) {
          reject(stderr);
        }
        resolve(stdout);
      }
    );
  });
};
