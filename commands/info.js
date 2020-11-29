const { client, Discord } = require("../TMPStats.js");
require("dotenv").config();
const config = require("../config.json");

module.exports = {
  name: "info",
  description: "Info about the bot",
  execute(message, args) {
    const infoEmbed = new Discord.MessageEmbed()
      .setAuthor("TruckersMP Stats Bot")
      .setTitle("Bot Info")
      .setColor("B92025")
      .setDescription("Information about this bot.")
      .setFooter(process.env.CREATOR_NAME, process.env.CREATOR_LOGO)
      .setThumbnail(process.env.THUMBNAIL_LOGO)
      .setTimestamp()
      .addField("Bot Version", `${process.env.BOT_VERSION}`, true)
      .addField("Last Updated", `${process.env.LAST_UPDATED}`, true)
      .addField("Server Count", `${client.guilds.cache.size} Servers`, true)
      .addField("Support Server", `${process.env.SUPPORT_SERVER}`, false)
      .addField(
        "Github Repo",
        "https://github.com/SDCore/TruckersMP-Server-Stats",
        false
      );

    message.channel.send(infoEmbed);
  },
};
