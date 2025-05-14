const { loadCommands } = require("../../Handlers/commandHandler");
const { ActivityType } = require("discord.js");

module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    console.log(`${client.user.username} foi iniciado com sucesso!`);

    const status = [
      { name: "Minecraft", type: ActivityType.Playing },
      { name: "Discord", type: ActivityType.Watching },
      { name: "SurvivusMC", type: ActivityType.Listening },
    ];

    let currentIndex = 0;

    function setNextStatus() {
      const currentStatus = status[currentIndex];
      client.user.setPresence({
        activities: [currentStatus],
        status: "online",
      });

      currentIndex = (currentIndex + 1) % status.length;
    }

    setNextStatus();

    const changeInterval = 60 * 1000;
    setInterval(setNextStatus, changeInterval);

    loadCommands(client);
  },
};
