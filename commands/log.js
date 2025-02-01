const { SlashCommandBuilder } = require("@discordjs/builders");
const { Table } = require("st.db");
const db = require("../JS/database");
const genMessage = require("../JS/genMessage");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("log")
    .setDescription("LOGGG")
    .addSubcommand((sub) =>
      sub
        .setName("daily")
        .setDescription("Log daily")
        .addChannelOption((dzan) =>
          dzan
            .setName("channel")
            .setDescription("Choice log channel")
            .setRequired(true)
        )
        .addBooleanOption((dzan) =>
          dzan
            .setName("get")
            .setDescription("If user claim the daily")
            .setRequired(true)
        )
        .addBooleanOption((dzan) =>
          dzan
            .setName("set")
            .setDescription("If system reset the daily")
            .setRequired(true)
        )
    ),
  onlyOwners: true,
  /**
   *
   * @param {import("discord.js").CommandInteraction} interaction
   */
  async run(interaction) {
    const sub = interaction.options.getSubcommand();
    if (sub === "daily") {
      const channel = interaction.options.getChannel("channel", true);
      const get = interaction.options.getBoolean("get", true);
      const set = interaction.options.getBoolean("set", true);
      const table = new Table(interaction.guild.id, db);
      await table
        .set("logDaily", { get, set, channel: channel.id })
        .then(async () => {
          await interaction.reply(
            "**Good. Save all data. But that will be able to work in the next update \n-DZAN**"
          );
        })
        .catch((e) => {
          console.log("Error: [CMD_LOG]:Sub[DAILY]: " + e);
          interaction.reply(
            "**Error. can't save data. But that will be able to work in the next update \n-DZAN**"
          );
        });
    }
  },
};
