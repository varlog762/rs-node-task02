import { promises as fs } from "fs";
import path from "path";

import { isPathAvailable } from "./checkFileSystem.js";

export async function removeFile(filePath, callback) {
  if (filePath) {
    const absoluteFilePath = path.join(filePath);

    try {
      await isPathAvailable(absoluteFilePath);
      await fs.unlink(absoluteFilePath);
      console.log("File removed successfully");
      callback();
    } catch (error) {
      console.log("Operation failed");
      callback();
    }
  }
}
