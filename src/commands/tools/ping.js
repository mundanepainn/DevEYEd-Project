const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Returns bot and API ping.'),
  async execute(interaction, client) {
    const message = await interaction.deferReply({
        fetchReply: true
    });
    
    const newMessage = `**Client Ping:** *${
      message.createdTimestamp - interaction.createdTimestamp
    }ms*\n\n**API Latency:** *${client.ws.ping}ms*`;
    
    const embed = new EmbedBuilder()
    .setTitle('Pong! :ping_pong:')
    .setDescription(newMessage)
    .setColor(0x000000)
    .setThumbnail(client.user.displayAvatarURL())

    
    await interaction.editReply({ content: "Here is you go!" });

    await interaction.channel.send({ embeds: [embed]});
  }
}
