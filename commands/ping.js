const { SlashCommandBuilder } = require("@discordjs/builders");
const db = require("../JS/database");
const { MessageEmbed } = require("discord.js");
const { color } = require("../JSON/bot.json");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Bot , Database"),
  onlyDev: true,
  /**
   * @param {import("discord.js").CommandInteraction} interaction
   */
  async run(interaction) {
    await interaction.reply({
      embeds: [
        new MessageEmbed()
          .setAuthor(
            interaction.client.user.tag,
            interaction.client.user.avatarURL({ dynamic: true })
          )
          .setDescription(
            `**Database Uptime**: ${Math.floor(
              db.uptime / 1000
            )}s , \nBot Ping: **${interaction.client.ws.ping}ms**`
          )
          .setColor(color),
      ],
    });
  },
};
