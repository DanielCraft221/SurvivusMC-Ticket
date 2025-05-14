const { ChatInputCommandInteraction } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command)
      return interaction.reply({
        content: "Este comando está desatualizado!",
        ephermal: true,
      });

    if (command.developer && interaction.user.id !== "1232720139653484606")
      return interaction.reply({
        content: "Este comando está disponível somente para o desenvolvedor!",
        ephermal: true,
      });

    command.execute(interaction, client);
  },
};
