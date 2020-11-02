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

  // Set the bots presence and updates
  // it every 5 minutes
  setInterval(function () {
    var date = new Date();

    if (date.getMinutes() % 5 == 0) {
      setPresence();
      console.log(`[${moment().format("hh:mm:ss")}] Updated presence for bot`);
    }
  }, Math.max(1, 5 || 1) * 60 * 1000);
});
