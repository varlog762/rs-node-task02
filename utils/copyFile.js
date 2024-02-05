import fs from "fs";
import path from "path";

import * as CheckFS from "./checkFileSystem.js";

export async function copyFile(
  filePath,
  destinationPath,
  callback,
  message = ""
) {
  if (filePath && destinationPath) {
    const absoluteFilePath = path.resolve(filePath);
    const absoluteDestinationPath = path.resolve(destinationPath);

    try {
      await CheckFS.isPathAvailable(absoluteFilePath);
      await CheckFS.throwErrorIfFileExists(absoluteDestinationPath);

      const readStream = fs.createReadStream(absoluteFilePath);
      const writeStream = fs.createWriteStream(absoluteDestinationPath);

      readStream.pipe(writeStream);

      writeStream.on("finish", () => {
        if (message) {
          console.log(message);
        }
        if (callback) {
          callback();
        }
      });
    } catch (error) {
      console.log("Operation failed");
      if (callback) {
        callback();
      }
    }
  } else {
    console.log("Operation failed");
    if (callback) {
      callback();
    }
  }
}
