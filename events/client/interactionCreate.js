const client = require("../../JS/client");
const { commands } = require("../../JS/command");
const { events } = require("../../JS/eventName");
const { ids } = require("../../JSON/users/owners/id.json");
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
    if (command.OnlyOwners && !ids.includes(interaction.user.id)) {
      return interaction.reply("Only Bot owners can use this Command");
    }
    if (command.OnlySerOwner && interaction.user.id !== owner.id) {
      return interaction.reply("Only Server owner can use this Command");
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
