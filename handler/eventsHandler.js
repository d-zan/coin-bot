const fs = require("fs");
const path = require("path");
const client = require("../JS/client");
const eventFoldersPath = path.join(__dirname, "../events");
fs.readdirSync(eventFoldersPath).filter(f=> !f.includes('log')).forEach((folder) => {
  const eventsFilesPath = path.join(eventFoldersPath, folder);
  fs.readdirSync(eventsFilesPath)
    .filter((file) => file.endsWith(".js"))
    .forEach((file) => {
      const filePath = path.join(eventsFilesPath, file);
      const event = require(filePath);
      if (event.once) {
        client.once(event.name, (...args) => event.run(...args));
      } else {
        client.on(event.name, (...args) => event.run(...args));
      }

    });
});
