const { SlashCommandBuilder } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Returns bot and API ping.'),
  async execute(interaction, client) {
    const message = await interaction.deferReply({
        fetchReply: true
    });

    const newMessage = `Client Ping: ${
      message.createdTimestamp - interaction.createdTimestamp
    }ms\nAPI Latency: ${client.ws.ping}ms`;
    await interaction.editReply({ content: newMessage });
  }
}
