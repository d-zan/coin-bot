const { SlashCommandBuilder } = require("@discordjs/builders");
const db = require("../JS/database");
const { Table } = require("st.db");
const { randomNumber } = require("generater.js");
const { min, max } = require("../JSON/daily.json");
const genMessage = require("../JS/genMessage");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("daily")
    .setDescription("Claim your daily coins"),
  /**
   * @param {import('discord.js').CommandInteraction} interaction
   */
  async run(interaction) {
    const number = randomNumber(min, max);
    await interaction.deferReply({ ephemeral: false });
    const data = new Table(interaction.user.id, db);
    if (await data.has("daily") && await data.get("daily" === 1)) {
      await interaction.editReply("You Claimed your daily.");
    } else {
      await data.math("coins", "+", number).then(async () => {
        await interaction.editReply(
          genMessage(`**[to] You claimed your daily [coin]\`${number}\`**`)
        );
        await data.set("daily", 1);
      });
    }
  },
};
