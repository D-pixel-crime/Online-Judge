import path from "path";
import { exec } from "child_process";
import fs from "fs";

const __dirname = path.resolve();

export const executeJS = async (filePath, timeLimit = 1) => {
  const jsDir = path.join(__dirname, "codes/javascript");
  const jobId = path.basename(filePath).split(".")[0];

  const isInput = fs.existsSync(`${jsDir}/${jobId}.txt`);

  return new Promise((resolve, reject) => {
    exec(
      `cd ${jsDir} && node ${jobId}.js ${isInput ? `< ${jobId}.txt` : ""}`,
      { timeout: timeLimit * 1000 },
      (error, stdout, stderr) => {
        if (error) {
          if (error.killed) {
            reject("Time Limit Exceeded");
          } else {
            reject(error, stderr);
          }
        } else if (stderr) {
          reject(stderr);
        }
        resolve(stdout);
      }
    );
  });
};
