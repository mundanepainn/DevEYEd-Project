const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("plays audio from provided link")
    .addStringOption((option) =>
      option.setName("url").setDescription("song url").setRequired(true)
    ),

  async execute(interaction, client) {
    const link = interaction.options.getString("url").trim();
    const channel = interaction.member.voice.channel;

    let result = new EmbedBuilder();

    if (!channel)
      return interaction.reply({
        embeds: result.setDescription("You must be connected to a channel!"),
        ephemeral: true,
      });

    if (!link.startsWith("https://"))
      return interaction.reply({
        embeds: result.setDescription("Please enter a correct audio link"),
        ephemeral: true,
      });

    if (
      link.includes("youtube.com") ||
      link.includes("youtu.be") ||
      link.includes("soundcloud.com") ||
      link.includes("spotify.com")
    )
      client.distube
        .play(channel, link)
        .catch((err) =>
          interaction.reply({
            content: "Something went wrong with the link",
            ephemeral: true,
          })
        );
      return
  },
};
