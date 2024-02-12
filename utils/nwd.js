import path from "path";

export function printWorkDirectory() {
  return process.cwd();
}

export function changeDirectory(dirPath) {
  try {
    const absolutePath = path.resolve(process.cwd(), dirPath);
    process.chdir(absolutePath);
    console.log(`You are currently in ${printWorkDirectory()}`);
  } catch (error) {
    console.log("Operation failed");
    console.log(`You are currently in ${printWorkDirectory()}`);
  }
}
