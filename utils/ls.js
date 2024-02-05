import fs from "fs/promises";
import path from "path";

export async function ls(dirPath, callback) {
  const absolutePath = path.resolve(dirPath);

  try {
    const files = await fs.readdir(absolutePath);
    const results = await Promise.all(
      files.map(async (item, idx) => {
        const filePath = path.join(absolutePath, item);
        const stats = await fs.stat(filePath);
        return {
          name: item,
          type: stats.isDirectory() ? "directory" : "file",
        };
      })
    );

    console.table(results.sort((a, b) => a.type.localeCompare(b.type)));
    callback();
  } catch (error) {
    console.log("Operation fail");
    callback();
  }
}
