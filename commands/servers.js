const { client, Discord } = require("../TMPStats.js");
require("dotenv").config();
const config = require("../config.json");
const fs = require("fs");
const moment = require("moment");

module.exports = {
  name: "servers",
  description: "Info about the bot",
  execute(message, args) {
    fs.readFile("./API_Data/apiOutput.json", "utf8", (err, jString) => {
      if (err) {
        console.log("File read failed:", err);
        return message.channel.send(
          "Failed to load cached server data. Cannot load server list. Try again later."
        );
      }

      // Set jsonString to the response from the cache file
      jsonString = JSON.parse(jString);

      const servers = new Discord.MessageEmbed()
        .setThumbnail(process.env.THUMBNAIL_LOGO)
        .setTitle("TruckersMP Server List")
        .setAuthor("TruckersMP Stats Bot")
        .setColor("B92025")
        .setDescription(
          `To use these servers, type\n\`!!stats [game] [server]\`\n\nFor example:\n\`!!stats ets2 eusim1\` or \`!!stats ats usarc\``
        )
        .setFooter(
          `${process.env.CREATOR_NAME}  •  Data updated ${moment(
            jsonString.updateTime
          ).fromNow()}`,
          process.env.CREATOR_LOGO
        )
        .setTimestamp()
        .addField(
          "ETS2 Simulation Servers",
          "eusim1\neusim2\nussim\nsgpsim",
          true
        )
        .addField("ETS2 Arcade Servers", "euarc\neupromodsarc", true)
        .addField("ETS2 ProMods Servers", "eupromods\neupromodsarc", true)
        .addField("ATS Simulation Servers", "ussim\neusim", true)
        .addField("ATS Arcade Servers", "usarc", true)
        .addField(
          "Event Servers (Can be used with any game, though might not always be active)",
          "eventserver1\neventserver2\neventserver3",
          true
        );

      message.channel.send(servers);
    });
  },
};
