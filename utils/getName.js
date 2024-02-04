export function getUsername() {
  const args = process.argv.slice(2);

  let name = "User";

  args.forEach((arg) => {
    if (arg.includes("--username")) {
      name = arg.split("=")[1];
    }
  });

  return name;
}
