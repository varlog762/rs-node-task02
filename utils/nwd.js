export function printWorkDirectory() {
  return process.cwd();
}

export function changeDirectory(path) {
  if (path) {
    process.chdir(path);
    console.log(`You are currently in ${printWorkDirectory()}`);
  }
}
