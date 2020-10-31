const { client } = require("../TMPStats.js");
const config = require("../config.json");
const moment = require("moment");

// Runs when the client connects to Discord
client.once("ready", () => {
  console.log(`Logging in as ${client.user.tag}`);

  // Set the bots presence to inform the user how to use the bot
  setInterval(() => {
    client.user
      .setPresence({
        activity: {
          name: `!!help for help | Providing data for ${client.guilds.cache.size} servers`,
          type: "WATCHING",
        },
        status: "online",
      })
      .catch(console.error);
    console.log(`[${moment().format("hh:mm:ss")}] Updated presence for bot`);
  }, 1000 * 60 * 5);
});
