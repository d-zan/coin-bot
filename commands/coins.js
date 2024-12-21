const { SlashCommandBuilder } = require("@discordjs/builders");
const { Table } = require("st.db");
const db = require("../JS/database");
const genMessage = require("../JS/genMessage");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("coin")
    .setDescription("Transfer to someone or see balance for someone")
    .addUserOption((dzan) =>
      dzan
        .setName("user")
        .setDescription("See balance to user or transfer to. ")
    )
    .addIntegerOption((dzan) =>
      dzan
        .setName("amount")
        .setDescription("The amount to tranfer to user")
        .setMinValue(1)
    ),
  /**
   *
   * @param {import("discord.js").CommandInteraction} interaction
   */
  async run(interaction) {
    const user = interaction.options.getUser("user");
    const amount = interaction.options.getInteger("amount");
    interaction.deferReply({ephemeral:false})
    if (amount && !user) {
     await interaction.editReply({ content: "You must specify a user to transfer to." });
    }
    if (user && amount) {
      const user1 = new Table(user.id, db);
      const user2 = new Table(interaction.user.id, db);
      if (await user2.has("coins")) {
        const user2Coins = await user2.get("coins");
        if (user2Coins >= amount) {
          await user2.math("coins", "-", amount).then(async () => {
            await user1.math("coins", "+", amount).then(async () => {
             await interaction.editReply({
                content: `You have transferred ${amount} coins to ${user.username}.`,
              });
            });
          });
        } else {
         await interaction.editReply({
            content: "You don't have enough coins to transfer.",
          });
        }
      } else {
        await interaction.editReply({
          content: genMessage(
            `**Your Coins: [coin] 0**, Can't transfer to any one.`
          ),
        });
      }
    }
    if (user) {
      const data = new Table(user.id, db);
      if (await data.has("coins")) {
        await interaction.editReply({
          content: genMessage(
            `**User Coins: [coin] ${await data.get("coins")}**`
          ),
        });
      } else {
        await interaction.editReply({
          content: genMessage(`**User Coins: [coin] 0**`),
        });
      }
    } else {
      const data = new Table(interaction.user.id, db);
      if (await data.has("coins")) {
        await interaction.editReply({
          content: genMessage(
            `**Your Coins: [coin] ${await data.get("coins")}**`
          ),
        });
      } else {
        await interaction.editReply({
          content: genMessage(`**Your Coins: [coin] 0**`),
        });
      }
    }
  },
};
