const { client } = require("../TMPStats.js");
const config = require("../config.json");

// Runs when the client connects to Discord
client.once("ready", () => {
  console.log(`Logging in as ${client.user.tag}`);

  // Set the bots presence to inform the user how to use the bot
  client.user
    .setPresence({
      activity: { name: "!!help for help", type: "WATCHING" },
      status: "online",
    })
    .catch(console.error);
});
