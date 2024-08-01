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
      `cd ${cppDir} && g++ ${jobId}.cpp -o ${jobId}.out && ./${jobId}.out ${
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
