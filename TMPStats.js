require("dotenv").config();
require("./API_Data/servers.json");

const Discord = require("discord.js");
const client = new Discord.Client({
  cacheRoles: false,
  cacheGuilds: true,
  cacheEmojis: false,
  cacheChannels: false,
  cachePresences: false,
  cacheOverwrites: false,
});

const fs = require("fs");
require("./functions.js")(client);

const config = require("./config.json");

process.on("unhandledRejection", (error) => {
  console.log(error.message, "error");
});

module.exports = {
  client: client,
  Discord: require("discord.js"),
};

// Login to Discord
client.login(config.token);
