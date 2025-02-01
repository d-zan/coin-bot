const fs = require("fs");
const path = require("path");
const { commands } = require("../JS/command");

const commandsPath = path.join(__dirname, "../commands");
fs.readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"))
  .forEach((file) => {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if (command.data && command.data.name) {
      commands.set(command.data.name, command);
    } else {
      console.log(
        `Error: Command ${file} does not have a valid data object or name.`
      );
    }
  });
