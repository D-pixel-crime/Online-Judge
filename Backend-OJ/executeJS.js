import { fileURLToPath } from "url";
import path from "path";
import { exec } from "child_process";

const temp = fileURLToPath(import.meta.url);
const __dirname = path.dirname(temp);

let jsDir = path.join(__dirname, "codes");
jsDir = path.join(jsDir, "javascript");

export const executeJS = async (filePath) => {
  const jobId = path.basename(filePath).split(".")[0];

  return new Promise((resolve, reject) => {
    exec(
      `cd ${jsDir} && node ${jobId}.js < ${jobId}.txt`,
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
