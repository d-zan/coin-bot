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
    await interaction.deferReply({ ephemeral: false });

    if (amount && !user) {
      return await interaction.editReply({
        content: "You must specify a user to transfer to.",
      });
    }

    if (user && amount) {
      if (user.bot) {
        return await interaction.editReply({ content: "User is bot." });
      }
      if (user.id === interaction.user.id) {
        return await interaction.editReply({ content: "You are the user😱." });
      }
      const to = new Table(user.id, db);
      const from = new Table(interaction.user.id, db);
      if (await from.has("coins")) {
        const fromCoins = await from.get("coins");

        if (fromCoins >= amount) {
          await from.math("coins", "-", amount).then(async () => {
            await to.math("coins", "+", amount).then(async () => {
              return await interaction
                .editReply({
                  content: `**You have transferred ${amount} coins to ${user.username}**.`,
                })
                .then(() => {
                  user.send(
                    `**Transfer receipt | ايصال التحويل** \n \`\`\` \n${interaction.user.id} [${amount}]=> ${user.id} \`\`\``
                  );
                });
            });
          });
        } else {
          return await interaction.editReply({
            content: "**You don't have enough coins to transfer**.",
          });
        }
      } else {
        return await interaction.editReply({
          content: genMessage(
            `**Your Coins 0[coin]**, Can't transfer to any one**.`
          ),
        });
      }
    }
    if (user) {
      if (user.bot) {
        return await interaction.editReply({ content: "**User is bot**." });
      }
      if (user.id === interaction.user.id) {
        return await interaction.editReply({ content: "**You are the user😱**." });
      }
      const data = new Table(user.id, db);
      if (await data.has("coins")) {
        return await interaction.editReply({
          content: genMessage(
            `**User Coins ${await data.get("coins")}[coin]**`
          ),
        });
      } else {
        return await interaction.editReply({
          content: genMessage(`**User Coins 0[coin]**`),
        });
      }
    } else {
      const data = new Table(interaction.user.id, db);
      if (await data.has("coins")) {
        return await interaction.editReply({
          content: genMessage(
            `**Your Coins  ${(await data.get("coins")) | 0}[coin]**`
          ),
        });
      }
    }
  },
};
