const { client, Discord } = require("../TMPStats.js");
require("dotenv").config();
const config = require("../config.json");
const fs = require("fs");
const moment = require("moment");

module.exports = {
  name: "stats",
  description: "Info about the bot",
  execute(message, args) {
    fs.readFile("../apiOutput.json", "utf8", (err, jString) => {
      if (err) {
        console.log("File read failed:", err);
        return message.channel.send(
          "Failed to load cached server data. Cannot load server list. Try again later."
        );
      }

      // Set jsonString to the response from the cache file
      jsonString = JSON.parse(jString);

      let game = args[0];
      let server = args[1];

      if (!args.length) {
        return message.channel.send(
          "Please provide valid arguments for this command. Need help? Type `!!help stats` for more information."
        );
      }

      if (game == "ats") {
        if (!server) {
          return message.channel.send(
            "Use `!!servers` to find the server that you need stats for."
          );
        }

        // Use the Server ID to get the position in the array
        function getServerNumber(serverID) {
          var keys = Object.keys(jsonString.response);

          for (var i = 0; i < keys.length; i++) {
            var key = keys[i];

            if (jsonString.response[key].id == serverID) {
              // Set the position of the Server Id in the array to 'key'
              return key;
            }
          }
        }

        if (server == "eusim") {
          var serverResponse = jsonString.response[getServerNumber("9")];
        } else if (server == "ussim") {
          var serverResponse = jsonString.response[getServerNumber("11")];
        } else if (server == "usarc") {
          var serverResponse = jsonString.response[getServerNumber("38")];
        } else if (server == "eventserver1") {
          var serverResponse = jsonString.response[getServerNumber("14")];
        } else if (server == "eventserver2") {
          var serverResponse = jsonString.response[getServerNumber("18")];
        } else if (server == "eventserver3") {
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

        const stats = new Discord.MessageEmbed()
          .setTitle(`American Truck Simulator - ${serverResponse.shortname}`)
          .setAuthor("TruckersMP Stats Bot")
          .setColor("B92025")
          .setDescription(
            `Current info for ${serverResponse.game}'s ${serverResponse.shortname} server.`
          )
          .setThumbnail("https://sdcore.dev/i/dlu9w46o.png")
          .setFooter(process.env.CREATOR_NAME, process.env.CREATOR_LOGO)
          .setTimestamp()
          .setURL("https://stats.truckersmp.com/live")
          .addField(
            "Server Name",
            `${serverResponse.shortname}\n${serverResponse.name}`,
            true
          )
          .addField("Server Status", serverStatus, true)
          .addField("Speed Limiter", limiter, true)
          .addField("Players Online", serverResponse.players, true)
          .addField("Max Players", serverResponse.maxplayers, true)
          .addField("Players in Queue", serverResponse.queue, true)
          .addField("Collisions Enabled", collidable, true)
          .addField("Cars for Players", cars, true)
          .addField("Police Cars for Players", police, true);

        return message.channel.send(stats);
      }

      if (game == "ets2") {
        if (!server) {
          return message.channel.send(
            "Use `!!servers` to find the server that you need stats for."
          );
        }

        // Use the Server ID to get the position in the array
        function getServerNumber(serverID) {
          var keys = Object.keys(jsonString.response);

          for (var i = 0; i < keys.length; i++) {
            var key = keys[i];

            if (jsonString.response[key].id == serverID) {
              // Set the position of the Server Id in the array to 'key'
              return key;
            }
          }
        }

        if (server == "eusim1") {
          var serverResponse = jsonString.response[getServerNumber("4")];
        } else if (server == "eusim2") {
          var serverResponse = jsonString.response[getServerNumber("5")];
        } else if (server == "ussim") {
          var serverResponse = jsonString.response[getServerNumber("30")];
        } else if (server == "euarc") {
          var serverResponse = jsonString.response[getServerNumber("8")];
        } else if (server == "eupromods") {
          var serverResponse = jsonString.response[getServerNumber("31")];
        } else if (server == "sgpsim") {
          var serverResponse = jsonString.response[getServerNumber("35")];
        } else if (server == "eupromodsarc") {
          var serverResponse = jsonString.response[getServerNumber("32")];
        } else if (server == "eventserver1") {
          var serverResponse = jsonString.response[getServerNumber("14")];
        } else if (server == "eventserver2") {
          var serverResponse = jsonString.response[getServerNumber("18")];
        } else if (server == "eventserver3") {
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

        const stats = new Discord.MessageEmbed()
          .setTitle(`American Truck Simulator - ${serverResponse.shortname}`)
          .setAuthor("TruckersMP Stats Bot")
          .setColor("B92025")
          .setDescription(
            `Current info for ${serverResponse.game}'s ${serverResponse.shortname} server.`
          )
          .setThumbnail("https://sdcore.dev/i/gxhhdkzx.png")
          .setFooter(process.env.CREATOR_NAME, process.env.CREATOR_LOGO)
          .setTimestamp()
          .setURL("https://stats.truckersmp.com/live")
          .addField(
            "Server Name",
            `${serverResponse.shortname}\n${serverResponse.name}`,
            true
          )
          .addField("Server Status", serverStatus, true)
          .addField("Speed Limiter", limiter, true)
          .addField("Players Online", serverResponse.players, true)
          .addField("Max Players", serverResponse.maxplayers, true)
          .addField("Players in Queue", serverResponse.queue, true)
          .addField("Collisions Enabled", collidable, true)
          .addField("Cars for Players", cars, true)
          .addField("Police Cars for Players", police, true);

        return message.channel.send(stats);
      } else {
        return message.channel.send("Not a valid game.");
      }
    });
  },
};
