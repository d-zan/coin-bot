const { SlashCommandBuilder } = require("@discordjs/builders");
const { Table } = require("st.db");
const db = require("../JS/database");
const genMessage = require("../JS/genMessage");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("add-coin")
    .setDescription("Add coins to someone")
    .addUserOption((dzan) =>
      dzan.setName("user").setDescription("User.").setRequired(true)
    )
    .addIntegerOption((dzan) =>
      dzan
        .setName("amount")
        .setDescription("The amount to add to user")
        .setMinValue(1)
        .setRequired(true)
    ),
    onlyDev:true,
  /**
   *
   * @param {import("discord.js").CommandInteraction} interaction
   */
  async run(interaction) {
    const user = interaction.options.getUser("user", true);
    const amount = interaction.options.getInteger("amount", true);
    await interaction.deferReply({ ephemeral: false });
if (user.bot) return await interaction.editReply({content:"**You can't add coins to bot.**"});
    const user1 = new Table(user.id, db);
    user1
      .math("coins", "+", amount)
      .then(async () => {
        interaction.editReply({
          content: `Coins added to ${user.username} successfully`,
        });
        user.send({
          content: `\n**Deposit receipt | ايصال الايداع** \n\`\`\`From: ${
            interaction.user.id
          } [${amount}]=> \nTo: ${user.id} [${await user1.get("coins")}]\`\`\` `,
        });
      })
      .catch(async (e) => {
        console.log("Error: [CMD_ADD-COINS]: " + e);
       await interaction.editReply({
          content: `Failed to add coins to ${user.username}`,
        });
      });
  },
};
