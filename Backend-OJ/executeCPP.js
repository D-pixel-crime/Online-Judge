import { fileURLToPath } from "url";
import path from "path";
import { exec } from "child_process";

const temp = fileURLToPath(import.meta.url);
const __dirname = path.dirname(temp);

let cppDir = path.join(__dirname, "codes");
cppDir = path.join(cppDir, "cpp");

export const executeCPP = async (filePath) => {
  const jobId = path.basename(filePath).split(".")[0];

  return new Promise((resolve, reject) => {
    exec(
      `cd ${cppDir} && g++ ${jobId}.cpp -o ${jobId}.exe && .\\${jobId}.exe < ${jobId}.txt`,
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
