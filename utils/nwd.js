import path from "path";

export function printWorkDirectory() {
  return process.cwd();
}

export function changeDirectory(path) {
  try {
    process.chdir(path);
    console.log(`You are currently in ${printWorkDirectory()}`);
  } catch (error) {
    try {
      const absolutePath = path.resolve(process.cwd(), path);
      process.chdir(absolutePath);
      console.log(`You are currently in ${printWorkDirectory()}`);
    } catch (error) {
      console.log("Operation failed");
    }
  }
}
