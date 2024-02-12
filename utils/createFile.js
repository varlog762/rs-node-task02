import { promises as fs } from "fs";
import path from "path";

import { throwErrorIfFileExists } from "./checkFileSystem.js";

export async function createFile(fileName, callback) {
  if (fileName) {
    const filePath = path.join(process.cwd(), fileName);

    try {
      await throwErrorIfFileExists(filePath);
      await fs.writeFile(filePath, "");
      console.log("File created successfully");
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
