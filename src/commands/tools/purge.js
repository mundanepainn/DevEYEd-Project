const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("purge")
    .setDescription("Tactical nuke, incoming!")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .addIntegerOption((option) =>
      option
        .setName("number")
        .setDescription(
          "the number of messages you want to delete (default is 50 and max is 100)"
        )
        .setRequired(false)
    ),
  async execute(interaction) {
    let numberOfMessages = interaction.options.getInteger('number');

    if (!numberOfMessages) numberOfMessages = 50;

    if (numberOfMessages < 1)
      return await interaction.reply({
        content: "Number cannot be equal to or less than zero",
        ephemeral: true,
      });

    if (numberOfMessages > 100) numberOfMessages = 100;

    const { size } = await interaction.channel.bulkDelete(numberOfMessages, true).catch((err) => console.log('Purge command was unusuccessful...'));

    const embedSuccess = new EmbedBuilder()
    .setTitle('Purge successful!')
    .setDescription(`${size} messages deleted!`)

    await interaction.reply({ embeds: [embedSuccess] })



  },
};
