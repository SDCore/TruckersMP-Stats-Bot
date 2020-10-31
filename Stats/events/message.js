const { client, Discord } = require("../TMPStats.js");
const config = require("../config.json");
const moment = require("moment");

const fs = require("fs");

const prefix = config.prefix;

client.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`../commands/${file}`);
  client.commands.set(command.name, command);
}

client.on("message", (message) => {
  // If the author of the message is the bot, ignore it
  if (message.author.bot) return;

  if (message.channel.type == "dm") {
    dmContent = `**(${moment(message.createdAt).format(
      "MMMM Do, YYYY h:mm:ss A"
    )}) [${message.author}]**\n${message.content}`;

    client.guilds.cache
      .get("664717517666910220")
      .channels.cache.get("772025716073824266")
      .send(dmContent);
    message.reply(
      "Hey! Join the support server at https://discord.gg/f3Pa8vJ to get support.\n\n*These DM's are not monitored.*"
    );
    return;
  }

  // If the message does not start with the prefix, ignore it
  if (!message.content.startsWith(prefix)) return;
});
