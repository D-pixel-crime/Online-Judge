import { fileURLToPath } from "url";
import path from "path";
import { exec } from "child_process";

// const temp = fileURLToPath(import.meta.url);
const __dirname = path.resolve();

export const executeCPP = async (filePath) => {
  let cppDir = path.join(__dirname, "codes/cpp");
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
