const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
require("dotenv/config");
const chalk = require("chalk");
const fs = require("fs");
const path = require("path");
const { id, guildId } = require("../../JSON/bot.json");
const { Auto_Reload_Slash_Command: ARSC } = require("../../JSON/enables.json");
const { events } = require("../../JS/eventName");
module.exports = {
  name: events.CLIENT_READY,
  once: false,
  async run() {
    if (!ARSC) return;
    const commands = [];
    const commandsPath = path.join(__dirname, "../../commands");
    const commandFiles = fs
      .readdirSync(commandsPath)
      .filter((file) => file.endsWith(".js"));

    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);
      const command = require(filePath);

      commands.push(command.data);
    }

    const rest = new REST({ version: "9" }).setToken(process.env.TOKEN);

    (async () => {
      try {
        await rest.put(Routes.applicationGuildCommands(id, guildId), {
          body: commands,
        });
        console.log(
          chalk.yellow.bold("Successfully registered slash command.")
        );
      } catch (error) {
        console.log("Error: [RELOAD_SLASH_COMMANDS]: " + error);
      }
    })();
  },
};
