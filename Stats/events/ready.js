const { client } = require("../TMPStats.js");
const moment = require("moment");

// Runs when the client connects to Discord
client.once("ready", () => {
  console.log(`Logging in as ${client.user.tag}`);

  function setPresence() {
    client.user
      .setPresence({
        activity: {
          name: `!!help | Providing data for ${client.guilds.cache.size} servers`,
          type: "WATCHING",
        },
        status: "online",
      })
      .catch(console.error);
  }

  // Set bot presence on initial load
  // This will prevent the presence from
  // being blank for the first 5 minutes
  // the bot runs
  setPresence();
  console.log(`[${moment().format("hh:mm:ss")}] Updated presence for bot`);
});
