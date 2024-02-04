import fs from "fs";
import os from "os";
import readline from "readline";

import { getUsername } from "./utils/getName.js";
import * as Navigation from "./utils/nwd.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const username = getUsername();
Navigation.changeDirectory(os.homedir());

console.log(`Welcome to the File Manager, ${username}!`);
console.log(`You are currently in ${Navigation.printWorkDirectory()}`);

rl.prompt();

rl.on("line", (input) => {
  const [command, ...args] = input.trim().split(" ");

  switch (command) {
    case "up":
      Navigation.changeDirectory("../");
      rl.prompt();
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
