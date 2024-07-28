import path from "path";
import { exec } from "child_process";
import fs from "fs";

const __dirname = path.resolve();

export const executePython = async (filePath) => {
  const pythonDir = path.join(__dirname, "codes/python");
  const jobId = path.basename(filePath).split(".")[0];

  const isInput = fs.existsSync(`${pythonDir}/${jobId}.txt`);

  return new Promise((resolve, reject) => {
    exec(
      `cd ${pythonDir} && python ${jobId}.py ${
        isInput ? `< ${jobId}.txt` : ""
      }`,
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
