const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");
const ms = require("ms");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Mostra a latência do BOT")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const { client } = interaction;

    try {
      const startTime = Date.now();
      await interaction.deferReply();

      const wsPing = Math.round(client.ws.ping);
      const responseLatency = Date.now() - startTime;

      const lastPing = Math.max(
        ...client.ws.shards.map((shard) => shard.lastPingTimestamp ?? 0)
      );
      const lastActive = Date.now() - lastPing;
      const formattedLastActive =
        lastActive < 1000 ? `${lastActive}ms` : ms(lastActive, { long: true });

      const botUptime = ms(client.uptime, { long: true });

      const embed = new EmbedBuilder()
        .setTitle(":ping_pong: Pong!")
        .setColor(0x006400)
        .addFields(
          {
            name: "<:icons_goodping:1358214530533949560> Websocket",
            value: `\`${wsPing}ms\``,
            inline: true,
          },
          {
            name: "<:discord:1358569455395012750> Mensagem",
            value: `\`${responseLatency}ms\``,
            inline: true,
          },
          {
            name: "\u200B",
            value: "\u200B",
            inline: true,
          },
          {
            name: "<:icons_reminder:1333448738290536580> Uptime",
            value: `\`${botUptime}\``,
            inline: true,
          },
          {
            name: "<:icons_globe:1333448742581436477> Shard Atual",
            value: "`Shard #1`",
            inline: true,
          }
        )
        .setFooter({
          text: "SurvivusMC Ticket︱v1",
        })
        .setTimestamp();

      await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      console.error("Erro ao executar /ping:", error);

      if (interaction.deferred || interaction.replied) {
        await interaction.editReply({
          content: ":x: | Ocorreu um erro ao calcular a latência.",
        });
      } else {
        await interaction.reply({
          content: ":x: | Ocorreu um erro ao calcular a latência.",
          flags: 64,
        });
      }
    }
  },
};
