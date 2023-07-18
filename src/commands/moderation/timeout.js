const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("timeout")
    .setDescription("Timeout a user in the server")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("the user you want to timeout")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("time")
        .setDescription("amount of time in minutes (default is a minute)")
        .setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("The reason for the timeout")
        .setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

  async execute(interaction) {
    const timeoutUser = interaction.options.getUser("user");
    const timeoutMember = await interaction.guild.members
      .fetch(timeoutUser.id)
      .catch((err) =>
        console.log("User does not exist or is not in this server")
      );
    let duration = interaction.options.getInteger("time");
    const guild = interaction.guild;

    if (!timeoutMember)
      return await interaction.reply({
        content: `${timeoutUser} mentioned is not in the server...`,
        ephemeral: true,
      });

    if (!duration) duration = 1;

    let reason = interaction.options.getString("reason");
    if (!reason) reason = "No reason provided...";

    const memberEmbed = new EmbedBuilder()
      .setColor(0x000)
      .setTitle("You have been timed out! Slow down!")
      .setDescription(`Reason: ${reason}`)
      .setThumbnail(guild.iconURL())
      .setFooter({ text: `Server: ${guild.name}` })
      .setTimestamp();

    await timeoutMember
      .send({
        embeds: [memberEmbed],
      })
      .catch((err) =>
        console.log(
          `User ${timeoutMember} did not receive timeout message, is their DM's turned off?`
        )
      );

    await timeoutMember
      .timeout(duration * 60 * 10000, `reason: ${reason}`)
      .catch((err) => console.error(err));

    const guildEmbed = new EmbedBuilder()
      .setColor(0x000)
      .setTitle(`A member has been successfully timed out!`)
      .setDescription(`*Who?* ${timeoutUser}\n*Reason:* ${reason}`)
      .setThumbnail(guild.iconURL())
      .setTimestamp();

    await interaction.reply({
      embeds: [guildEmbed],
    });
  },
};
