const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("kick a user from the server")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("the user you want to kick from the server")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("The reason for the kick")
        .setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

  async execute(interaction) {
    const kickUser = interaction.options.getUser("user");
    const kickMember = await interaction.guild.members.fetch(kickUser.id);

    if (!kickMember)
      return await interaction.reply({
        content: "User mentioned is not in the server...",
        ephemeral: true,
      });

    let reason = interaction.options.getString("reason");
    if (!reason) reason = "No reason provided...";

    await kickMember
      .send({
        content: `You have been kicked from a server! **Server:** ${interaction.guild.name}; **Reason:** ${reason}`,
      })
      .catch((err) =>
        console.log(
          `User ${kickMember} did not receive kick message, is their DM's turned off?`
        )
      );

    await kickMember.kick({ reason: reason }).catch((err) => console.error(err));

    await interaction.reply({
      content: `User ${kickUser.tag} successfully kicked.`,
    });
  },
};
