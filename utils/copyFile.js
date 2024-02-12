import fs from "fs";
import path from "path";

import * as CheckFS from "./checkFileSystem.js";

export async function copyFile(
  filePath,
  newDirectoryPath,
  callback,
  message = ""
) {
  if (filePath && newDirectoryPath) {
    const absoluteFilePath = path.resolve(filePath);
    const absoluteDestinationFilePath = path.join(
      newDirectoryPath,
      path.basename(absoluteFilePath)
    );

    try {
      await CheckFS.isPathAvailable(absoluteFilePath);
      await CheckFS.throwErrorIfFileExists(absoluteDestinationFilePath);

      const readStream = fs.createReadStream(absoluteFilePath);
      const writeStream = fs.createWriteStream(absoluteDestinationFilePath);

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
