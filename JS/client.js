const { Client } = require("discord.js");
const client = new Client({
  intents: 131071,
});
module.exports = client;