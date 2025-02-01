const { Table } = require("st.db");
const client = require("../../JS/client");
const db = require("../../JS/database");
const { events } = require("../../JS/eventName");
const ms = require("ms");

module.exports = {
  name: events.CLIENT_READY,
  once: false,
  async run() {
    setInterval(() => {
      client.guilds.cache.forEach(async (guild) => {
        guild.members.cache
          .filter((m) => m.user.bot)
          .forEach(async (m) => {
            const data = new Table(m.user.id, db);
            if (await data.has("daily")) {
              const daily = await data.get("daily");
              if (daily === 1) data.set("daily", 2);
              //console.log(`Reload Daily: ${m.user.tag}`);
            }
          });
      });
    }, ms("1d"));
  },
};
