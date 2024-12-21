const chalk = require("chalk");
const client = require("../../JS/client");
const { events } = require("../../JS/eventName");

module.exports = {
    name:events.CLIENT_READY,
    once: true,
    run() {
console.log(chalk.green.bold(`Log in ${client.user.tag}`));
    }
}