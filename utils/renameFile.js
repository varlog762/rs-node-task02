import { promises as fs } from "fs";
import path from "path";

import * as CheckFS from "./checkFileSystem.js";

export async function renameFile(filePath, newName, callback) {
  if (filePath && newName) {
    const absoluteFilePath = path.resolve(filePath);
    const absoluteNewFilePath = path.join(
      path.dirname(absoluteFilePath),
      newName
    );

    try {
      await CheckFS.isPathAvailable(absoluteFilePath);
      await CheckFS.throwErrorIfFileExists(absoluteNewFilePath);

      await fs.rename(absoluteFilePath, absoluteNewFilePath);

      console.log("File renamed successfully");
      callback();
    } catch (error) {
      console.log("Operation failed");
      callback();
    }
  } else {
    console.log("Operation failed");
    callback();
  }
}
