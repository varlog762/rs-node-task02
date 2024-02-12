import { copyFile } from "./copyFile.js";
import { removeFile } from "./removeFile.js";

export async function moveFile(filePath, newDirectoryPath, callback) {
  if (filePath && newDirectoryPath) {
    try {
      await copyFile(filePath, newDirectoryPath);
      await removeFile(filePath);

      console.log("File moved successfully");
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
