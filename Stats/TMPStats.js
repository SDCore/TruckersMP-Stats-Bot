require("dotenv").config();
require("../apiOutput.json");

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

const moment = require("moment");
const config = require("./config.json");

// When there is a message on the server...
client.on("message", (message) => {
  // If the author of the message is the bot, ignore it
  if (message.author.equals(client.user)) return;

  // If the message doesn't begin with !!, ignore it
  if (!message.content.startsWith("!!")) return;

  const prefix = "!!";
  const args = message.content
    .toLowerCase()
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();

  const creatorName = "SDBots 2020";
  const creatorLogo = "https://sdcore.dev/i/1m3gbh27.png";

  if (command === "servers") {
    fs.readFile("../apiOutput.json", "utf8", (err, jString) => {
      // If the file is failed to be read (ie. insufficient permissions)
      if (err) {
        console.log("File read failed:", err);
        return;
      }

      // Set jsonString to the response from the file
      jsonString = JSON.parse(jString);
      const serverEmbed = new Discord.MessageEmbed()
        .setThumbnail("https://sdcore.dev/i/jr8vjd0m.png")
        .setTitle("TruckersMP Server List")
        .setAuthor("TruckersMP Stats Bot")
        .setColor([100, 65, 164])
        .setDescription(
          `A current list of servers available to the bot.\nData was last fetched **${moment(
            jsonString.updateTime
          ).fromNow()}**.`
        )
        .setFooter(creatorName, creatorLogo)
        .addField(
          "ETS2 Simulation Servers",
          "eusim1\neusim2\neusim3\nussim\nsgpsim",
          true
        )
        .addField("ETS2 Arcade Servers", "euarc", true)
        .addField("ETS2 ProMods Servers", "eupromods", true)
        .addField("ATS Simulation Servers", "ussim\neusim", true)
        .addField(
          "Event Servers (Can be used with any game)",
          "eventserver1\neventserver2\neventserver3",
          true
        );
      return message.channel.send(serverEmbed);
    });
    return;
  }

  if (command === "stats") {
    fs.readFile("../apiOutput.json", "utf8", (err, jString) => {
      // If the file is failed to be read (ie. insufficient permissions)
      if (err) {
        console.log("File read failed:", err);
        return;
      }

      // Set jsonString to the response from the file
      jsonString = JSON.parse(jString);

      let argOne = args[0];
      let argTwo = args[1];

      if (!args.length) {
        return message.channel.send(
          "Please provide valid arguments for this command. Need help? Type `!!help stats` for more information."
        );
      }

      if (argOne == "ats") {
        if (!argTwo) {
          return message.channel.send(
            "Use !!servers to find the server that you need stats for."
          );
        }

        // Use the Server ID to get the position in the array
        function getServerNumber(serverID) {
          var keys = Object.keys(jsonString.response);

          for (var i = 0; i < keys.length; i++) {
            var key = keys[i];

            if (jsonString.response[key].id == serverID) {
              // Set the position of the Server ID in the array to 'key'
              return key;
            }
          }
        }

        if (argTwo == "eusim") {
          var serverResponse = jsonString.response[getServerNumber("9")];
        } else if (argTwo == "ussim") {
          var serverResponse = jsonString.response[getServerNumber("11")];
        } else if (argTwo == "eventserver1") {
          var serverResponse = jsonString.response[getServerNumber("14")];
        } else if (argTwo == "eventserver2") {
          var serverResponse = jsonString.response[getServerNumber("18")];
        } else if (argTwo == "eventserver3") {
          var serverResponse = jsonString.response[getServerNumber("25")];
        } else {
          return message.channel.send("Not a valid server for that game.");
        }

        if (serverResponse.online == true) {
          var serverStatus = "Online";
        } else {
          var serverStatus = "Offline";
        }

        if (serverResponse.speedlimiter == 1) {
          var limiter = "Enabled";
        } else {
          var limiter = "Disabled";
        }

        if (serverResponse.collisions == true) {
          var collidable = "True";
        } else {
          var collidable = "False";
        }

        if (serverResponse.carsforplayers == true) {
          var cars = "True";
        } else {
          var cars = "False";
        }

        if (serverResponse.policecarsforplayers == true) {
          var police = "True";
        } else {
          var police = "False";
        }

        const atsEmbed = new Discord.MessageEmbed()
          .setTitle(
            `American Truck Simulator - ${serverResponse.shortname} Stats`
          )
          .setAuthor("TruckersMP Stats Bot")
          .setColor([100, 64, 164])
          .setDescription(
            `Current information for ${serverResponse.game}'s ${serverResponse.shortname} Server.`
          )
          .setThumbnail("https://i.imgur.com/4sxECuX.png")
          .setFooter(creatorName, creatorLogo)
          .setTimestamp()
          .setURL("https://stats.truckersmp.com/live")
          .addField("Server Name", serverResponse.name, true)
          .addField("Server Status", serverStatus, true)
          .addField("Speed Limiter", limiter, true)
          .addField("Players Online", serverResponse.players, true)
          .addField("Max Players", serverResponse.maxplayers, true)
          .addField("Players in Queue", serverResponse.queue, true)
          .addField("Collisions Enabled", collidable, true)
          .addField("Cars for Players", cars, true)
          .addField("Police Cars for Players", police, true);

        return message.channel.send(atsEmbed);
      } else if (argOne == "ets2") {
        if (!argTwo) {
          return message.channel.send(
            "Use !!servers to find the server that you need stats for."
          );
        }

        // Use the Server ID to get the position in the array
        function getServerNumber(serverID) {
          var keys = Object.keys(jsonString.response);

          for (var i = 0; i < keys.length; i++) {
            var key = keys[i];

            if (jsonString.response[key].id == serverID) {
              // Set the position of the Server ID in the array to 'key'
              return key;
            }
          }
        }

        if (argTwo == "eusim1") {
          var serverResponse = jsonString.response[getServerNumber("4")];
        } else if (argTwo == "eusim2") {
          var serverResponse = jsonString.response[getServerNumber("5")];
        } else if (argTwo == "eusim3") {
          var serverResponse = jsonString.response[getServerNumber("34")];
        } else if (argTwo == "ussim") {
          var serverResponse = jsonString.response[getServerNumber("30")];
        } else if (argTwo == "euarc") {
          var serverResponse = jsonString.response[getServerNumber("8")];
        } else if (argTwo == "eupromods") {
          var serverResponse = jsonString.response[getServerNumber("31")];
        } else if (argTwo == "sgpsim") {
          var serverResponse = jsonString.response[getServerNumber("35")];
        } else if (argTwo == "eventserver1") {
          var serverResponse = jsonString.response[getServerNumber("14")];
        } else if (argTwo == "eventserver2") {
          var serverResponse = jsonString.response[getServerNumber("18")];
        } else if (argTwo == "eventserver3") {
          var serverResponse = jsonString.response[getServerNumber("25")];
        } else {
          return message.channel.send("Not a valid server for that game.");
        }

        if (!serverResponse) {
          return message.channel.send("Server appears to be offline.");
        }

        if (serverResponse.online == true) {
          var serverStatus = "Online";
        } else {
          var serverStatus = "Offline";
        }

        if (serverResponse.speedlimiter == 1) {
          var limiter = "Enabled";
        } else {
          var limiter = "Disabled";
        }

        if (serverResponse.collisions == true) {
          var collidable = "True";
        } else {
          var collidable = "False";
        }

        if (serverResponse.carsforplayers == true) {
          var cars = "True";
        } else {
          var cars = "False";
        }

        if (serverResponse.policecarsforplayers == true) {
          var police = "True";
        } else {
          var police = "False";
        }

        const ets2Embed = new Discord.MessageEmbed()
          .setTitle(
            `Euro Truck Simulator 2 - ${serverResponse.shortname} Stats`
          )
          .setAuthor("TruckersMP Stats Bot")
          .setColor([100, 64, 164])
          .setDescription(
            `Current information for ${serverResponse.game}'s ${serverResponse.shortname} Server.`
          )
          .setThumbnail("https://i.imgur.com/A1pY076.png")
          .setFooter(creatorName, creatorLogo)
          .setTimestamp()
          .setURL("https://stats.truckersmp.com/live")
          .addField("Server Name", serverResponse.name, true)
          .addField("Server Status", serverStatus, true)
          .addField("Speed Limiter", limiter, true)
          .addField("Players Online", serverResponse.players, true)
          .addField("Max Players", serverResponse.maxplayers, true)
          .addField("Players in Queue", serverResponse.queue, true)
          .addField("Collisions Enabled", collidable, true)
          .addField("Cars for Players", cars, true)
          .addField("Police Cars for Players", police, true);

        return message.channel.send(ets2Embed);
      } else {
        return message.channel.send("Not a game.");
      }
    });
  } else {
    // If the command specified doesn't exist
  }
});

process.on("unhandledRejection", (error) => {
  console.log(error.message, "error");
});

module.exports = {
  client: client,
  Discord: require("discord.js"),
};

// Login to Discord
client.login(config.token);
