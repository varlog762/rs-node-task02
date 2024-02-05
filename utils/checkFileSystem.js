import { promises as fs } from "fs";
import path from "path";

export async function isFileAvailable(filePath) {
  const absolutePath = path.resolve(filePath);

  try {
    await fs.access(absolutePath, fs.constants.F_OK);
  } catch (error) {
    throw error;
  }
}
