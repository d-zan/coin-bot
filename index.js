const path = require("path");
const fs = require("fs");
const client = require("./JS/client");
const handlerPath = path.join(__dirname, "handler");
require("dotenv/config");
fs.readdirSync(handlerPath)
  .filter((file) => file.endsWith(".js"))
  .forEach((file) => {
    const filePath = path.join(handlerPath, file);
    require(filePath);
  });
client.login(process.env.TOKEN).catch((e) => {
  console.log("Error: [LOGIN]: " + e);
});