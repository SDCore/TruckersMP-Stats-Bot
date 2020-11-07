module.exports = {
  name: "ping",
  description: "Ping pong.",
  execute(message, args) {
    message.channel.send("Pinging...").then((m) => {
      var ping = m.createdTimestamp - message.createdTimestamp;

      m.edit(`Your ping is ${ping}ms.`);
    });
  },
};
