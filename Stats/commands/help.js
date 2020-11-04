const { client, Discord } = require("../TMPStats.js");
require("dotenv").config();
const config = require("../config.json");

module.exports = {
  name: "help",
  description: "Help",
  execute(message, args) {
    let argOne = args[0];

    if (!args.length) {
      const helpEmbed = new Discord.MessageEmbed()
        .setTitle("TruckersMP Stats Bot Help and Command List")
        .setAuthor("TruckersMP Stats Bot")
        .setColor("B92025")
        .setFooter(process.env.CREATOR_NAME, process.env.CREATOR_LOGO)
        .setThumbnail("https://sdcore.dev/i/jr8vjd0m.png")
        .setTimestamp()
        .addField(
          "This Bot",
          "A list of all the commands available to the bot.\n\nThis bot can show information about specific ATS and ETS2 TruckersMP servers.\n\nIt's useful for event servers, checking server player count and queue, and overall showing more information.",
          false
        )
        .addField(`${config.prefix}help`, "Shows this response.", true)
        .addField(
          `${config.prefix}help stats`,
          "Shows you how to use the !!stats command.",
          true
        )
        .addField(
          `${config.prefix}servers`,
          "Shows the servers that this bot can show stats for.",
          true
        )
        .addField(
          `${config.prefix}stats [game] [server]`,
          "Shows the stats for the server you selected.",
          true
        )
        .addField(`${config.prefix}info`, "Shows info about the bot.", true);

      message.channel.send(helpEmbed);
    } else if (argOne.toLowerCase() == "stats") {
      const helpStatsEmbed = new Discord.MessageEmbed()
        .setTitle("How to use the Stats Command")
        .setAuthor("TruckersMP Stats Bot")
        .setThumbnail("https://sdcore.dev/i/jr8vjd0m.png")
        .setColor("B92025")
        .setDescription(
          "The stats command takes 2 arguments: A game argument, and a server argument.\n\nThe game argument can be one of three things: ATS, ETS2, or Event.\n\nThe server argument can be any of the servers listed under the !!servers command."
        )
        .setFooter(process.env.CREATOR_NAME, process.env.CREATOR_LOGO)
        .setTimestamp();

      message.channel.send(helpStatsEmbed);
    } else {
      message.channel.send(
        `That is not a valid argument for that command, ${message.author}.`
      );
    }
  },
};
