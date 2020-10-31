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
      .setColor([100, 65, 164])
      .setDescription("Information about this bot.")
      .setFooter(config.creatorName, config.creatorLogo)
      .setThumbnail("https://sdcore.dev/i/jr8vjd0m.png")
      .setTimestamp()
      .addField("Bot Version", `${process.env.BOT_VERSION}`, true)
      .addField("Last Updated", `${process.env.LAST_UPDATED}`, true)
      .addField("Server Count", `${client.guilds.cache.size} Servers`, true);

    return message.channel.send(infoEmbed);
  },
};
