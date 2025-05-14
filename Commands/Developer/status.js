const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");
const os = require("os");
const ms = require("ms");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("status")
    .setDescription("Exibe o status geral do BOT")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const { client } = interaction;

    if (interaction.user.id !== "1232720139653484606") {
      return interaction.reply({
        content:
          ":x: | Este comando está disponível somente para o desenvolvedor!",
        flags: 64,
      });
    }

    try {
      await interaction.deferReply();

      const totalGuilds = client.guilds.cache.size;
      const totalUsers = client.users.cache.size;
      const memoryUsage = process.memoryUsage().heapUsed / 1024 / 1024;
      const uptime = ms(client.uptime, { long: true });
      const nodeVersion = process.version;
      const djsVersion = require("discord.js").version;
      const wsPing = Math.round(client.ws.ping);

      const embed = new EmbedBuilder()
        .setTitle("📊 Status Geral do BOT")
        .setColor(0x006400)
        .addFields(
          { name: "📡 Ping", value: `\`${wsPing}ms\``, inline: true },
          { name: "⏱️ Uptime", value: `\`${uptime}\``, inline: true },
          { name: "🌐 Servidores", value: `\`${totalGuilds}\``, inline: true },
          { name: "👥 Usuários", value: `\`${totalUsers}\``, inline: true },
          {
            name: "💾 Memória",
            value: `\`${memoryUsage.toFixed(2)} MB\``,
            inline: true,
          },
          { name: "🛠️ Node.js", value: `\`${nodeVersion}\``, inline: true },
          { name: "📦 Discord.js", value: `\`v${djsVersion}\``, inline: true }
        )
        .setFooter({ text: "SurvivusMC Status︱v1" })
        .setTimestamp();

      await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      console.error("Erro ao executar /status:", error);

      const errorMsg = ":x: | Ocorreu um erro ao exibir o status.";

      if (interaction.deferred || interaction.replied) {
        await interaction.editReply({ content: errorMsg });
      } else {
        await interaction.reply({
          content: errorMsg,
          flags: 64,
        });
      }
    }
  },
};
