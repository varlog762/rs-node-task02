import { promises as fs } from "fs";
import path from "path";

export async function isPathAvailable(filePath) {
  const absolutePath = path.resolve(filePath);

  try {
    await fs.access(absolutePath, fs.constants.F_OK);
  } catch (error) {
    throw error;
  }
}

export async function throwErrorIfFileExists(filePath) {
  const absolutePath = path.resolve(filePath);

  try {
    await fs.access(absolutePath, fs.constants.F_OK);
    throw new Error("Operation failed");
  } catch (error) {
    if (error.code !== "ENOENT") {
      throw error;
    }
  }
}
