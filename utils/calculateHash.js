import fs from "fs";
import path from "path";
import crypto from "crypto";

import { isPathAvailable } from "./checkFileSystem.js";

export async function calculateHash(filePath, callback) {
  if (filePath) {
    const absolutePath = path.resolve(filePath);

    try {
      await isPathAvailable(absolutePath);

      const hash = crypto.createHash("sha256");
      const readStream = fs.createReadStream(absolutePath);

      readStream.on("data", (chunk) => {
        hash.update(chunk);
      });

      readStream.on("end", () => {
        const hexHash = hash.digest("hex");
        console.log("SHA256 Hash:", hexHash);
        callback();
      });
    } catch (error) {
      console.log("Operation failed");
      callback();
    }
  } else {
    console.log("Operation failed");
    callback();
  }
}
