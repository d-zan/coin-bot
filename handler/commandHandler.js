const fs = require("fs");
const path = require("path");
const { commands } = require("../JS/command");

const slashCommandsPath = path.join(__dirname, "../commands");
fs.readdirSync(slashCommandsPath)
  .filter((file) => file.endsWith(".js"))
  .forEach((file) => {
    const filePath = path.join(slashCommandsPath, file);
    const command = require(filePath);
    if (command.data && command.data.name) {
      commands.set(command.data.name, command);
    } else {
      console.log(
        `Error: Command ${file} does not have a valid data object or name.`
      );
    }
  });
