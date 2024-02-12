import fs from "fs";
import zlib from "zlib";
import path from "path";

import { isPathAvailable } from "./checkFileSystem.js";

export async function compress(sourceFilePath, destinationFilePath, callback) {
  if (sourceFilePath && destinationFilePath) {
    const absoluteSourceFilePath = path.resolve(sourceFilePath);
    const absoluteDestinationFilePath = path.resolve(destinationFilePath);

    try {
      await isPathAvailable(absoluteSourceFilePath);
      await isPathAvailable(path.dirname(absoluteDestinationFilePath));

      const readStream = fs.createReadStream(absoluteSourceFilePath);
      const compressor = zlib.createBrotliCompress();
      const writeStream = fs.createWriteStream(absoluteDestinationFilePath);

      readStream.pipe(compressor).pipe(writeStream);

      compressor.on("error", (error) => {
        console.error(`Operation failed: ${error.message}`);
        callback();
      });

      console.log("File compressed successfully");

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
