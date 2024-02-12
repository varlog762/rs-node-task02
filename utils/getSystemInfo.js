import os from "os";

export function getSystemInfo(param) {
  let result;

  switch (param) {
    case "--EOL":
      result = os.EOL.split("");
      break;
    case "--cpus":
      result = os.cpus();
      break;
    case "--homedir":
      result = os.homedir();
      break;
    case "--username":
      result = os.userInfo().username;
      break;
    case "--architecture":
      result = os.arch();
      break;
    default:
      result = "Operation failed";
      break;
  }

  return result;
}
