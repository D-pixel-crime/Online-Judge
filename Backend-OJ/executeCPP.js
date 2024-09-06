import path from "path";
import { exec } from "child_process";
import fs from "fs";

const __dirname = path.resolve();

export const executeCPP = async (filePath) => {
  const cppDir = path.join(__dirname, "codes/cpp");
  const jobId = path.basename(filePath).split(".")[0];

  const isInput = fs.existsSync(`${cppDir}/${jobId}.txt`);

  return new Promise((resolve, reject) => {
    exec(
      `cd ${cppDir} && g++ ${jobId}.cpp -o ${jobId}.out && .//${jobId}.out ${
        isInput ? `< ${jobId}.txt` : ""
      }`,
      { timeout: 5000 },
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
