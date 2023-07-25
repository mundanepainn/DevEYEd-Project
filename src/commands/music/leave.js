const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("leave")
    .setDescription("Makes the bot leave the call"),
  async execute(interaction, client) {
    let channel = interaction.member.voice.channelId;
    const reply = new EmbedBuilder().setDescription(
      "DevEYEd has left the voice channel"
    );
    if (!channel)
      return interaction.reply({
        content: "You are not in a voice channel!",
        ephemeral: true,
      });

    try {
      client.distube.voices.leave(interaction.guild);
      return interaction.reply({ embeds: [reply] });
    } catch {
      console.log("Something went wrong when DevEYEd tried to leave VC");
    }
  },
};
