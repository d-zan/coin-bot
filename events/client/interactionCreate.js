const client = require("../../JS/client");
const { commands } = require("../../JS/command");
const { events } = require("../../JS/eventName");
const { ids:owners } = require("../../JSON/users/owners/id.json");
const { ids:dev } = require("../../JSON/users/dev/id.json");
module.exports = {
  name: events.INTERACTION_CREATE,
  once: false,
  /**
   * @param {import("discord.js").Interaction} interaction
   */
  async run(interaction) {
    if (!interaction.isCommand()) return;
    const command = commands.get(interaction.commandName);
    const guild = client.guilds.cache.get(interaction.guild.id);
    const owner = await guild.fetchOwner();
    if (!command) return;
    if (command.onlyOwners && !owners.includes(interaction.user.id)) {
      return interaction.reply("**Only Bot owners can use this Command**");
    }
    if (command.onlyDev && !dev.includes(interaction.user.id)) {
      return interaction.reply("**Only Bot Developers can use this Command**");
    }
    if (command.onlySerOwner && interaction.user.id !== owner.id) {
      return interaction.reply("**Only Server owner can use this Command**");
    }
    if (command.permissions && !interaction.member.permissions.has(command.permissions)) {
      return interaction.reply("**You don't have a permissions to use this command**.");
    }
    try {
      await command.run(interaction, client);
    } catch (error) {
      console.log(error);
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  },
};
