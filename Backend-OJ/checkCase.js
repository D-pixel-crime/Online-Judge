import { exec } from "child_process";
import fs from "fs";
import path from "path";

const __dirname = path.resolve();

export const checkCase = async (filePath, inputPath, input, language) => {
  let langDir = path.join(__dirname, `codes/${language}`);
  const strInput = input.join("\n");
  console.log(strInput);

  const jobId = path.basename(filePath).split(".")[0];

  try {
    fs.writeFileSync(inputPath, strInput.trim());

    switch (language) {
      case "cpp":
        return new Promise((resolve, reject) => {
          exec(
            `cd ${langDir} && g++ ${jobId}.cpp -o ${jobId}.exe && .\\${jobId}.exe < ${jobId}.txt`,
            (error, stdout, stderr) => {
              if (error) return reject(error, stderr);
              if (stderr) return reject(stderr);
              return resolve(stdout);
            }
          );
        });

      case "python":
        return new Promise((resolve, reject) => {
          exec(
            `cd ${langDir} && python ${jobId}.py < ${jobId}.txt`,
            (error, stdout, stderr) => {
              if (error) return reject(error, stderr);
              if (stderr) return reject(stderr);
              return resolve(stdout);
            }
          );
        });

      case "javascript":
        return new Promise((resolve, reject) => {
          exec(
            `cd ${langDir} && node ${jobId}.js < ${jobId}.txt`,
            (error, stdout, stderr) => {
              if (error) return reject(error, stderr);
              if (stderr) return reject(stderr);
              return resolve(stdout);
            }
          );
        });
    }
  } catch (error) {
    return { error };
  }
};
