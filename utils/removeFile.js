import { promises as fs } from "fs";
import path from "path";

import { isPathAvailable } from "./checkFileSystem.js";

export async function removeFile(filePath, callback, message = "") {
  if (filePath) {
    const absoluteFilePath = path.join(filePath);

    try {
      await isPathAvailable(absoluteFilePath);
      await fs.unlink(absoluteFilePath);
      if (message) {
        console.log(message);
      }
      if (callback) {
        callback();
      }
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
