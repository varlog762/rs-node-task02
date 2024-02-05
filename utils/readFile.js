import fs from "fs";
import path from "path";

import { isPathAvailable } from "./checkFileSystem.js";

export async function readFile(filePath, callback) {
  if (filePath) {
    const absoluteFilePath = path.resolve(filePath);

    try {
      await isPathAvailable(absoluteFilePath);

      const readStream = fs.createReadStream(absoluteFilePath, {
        encoding: "utf-8",
      });

      readStream.on("data", (chunk) => {
        console.log(chunk);
      });

      readStream.on("end", () => {
        callback();
      });
    } catch (error) {
      console.log("Operation failed");
      callback();
    }
  }
}
