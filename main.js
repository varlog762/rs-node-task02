import fs from "fs";
import os from "os";
import readline from "readline";

import { getUsername } from "./utils/getName.js";
import { getSystemInfo } from "./utils/getSystemInfo.js";
import { calculateHash } from "./utils/calculateHash.js";
import { compress } from "./utils/compress.js";
import * as Navigation from "./utils/nwd.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const username = getUsername();
console.log(`Welcome to the File Manager, ${username}!`);

Navigation.changeDirectory(os.homedir());

rl.prompt();

rl.on("line", (input) => {
  const [command, ...args] = input.trim().split(" ");

  switch (command) {
    case "up":
      Navigation.changeDirectory("../");
      rl.prompt();
      break;
    case "cd":
      Navigation.changeDirectory(args[0]);
      rl.prompt();
      break;
    case "ls":
      fs.readdir(".", (err, files) => {
        if (err) {
          console.error("Error:", err);
          return;
        }
        console.log(files.join("\n"));
        rl.prompt();
      });
      break;
    case "os":
      console.log(getSystemInfo(args[0]));
      console.log(`You are currently in ${Navigation.printWorkDirectory()}`);
      rl.prompt();
      break;
    case "hash":
      calculateHash(args[0], () => {
        console.log(`You are currently in ${Navigation.printWorkDirectory()}`);
        rl.prompt();
      });
      break;
    case "compress":
      compress(args[0], args[1], () => {
        console.log(`You are currently in ${Navigation.printWorkDirectory()}`);
        rl.prompt();
      });
      break;
    case ".exit":
      rl.close();
      break;
    default:
      console.log("Invalid input");
      rl.prompt();
      break;
  }
}).on("close", () => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  process.exit(0);
});
