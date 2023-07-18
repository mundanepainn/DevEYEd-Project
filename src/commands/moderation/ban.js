const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("bans a user from the server")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("the user you want to ban from the server")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("The reason for the ban")
        .setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

  async execute(interaction) {
    const banUser = interaction.options.getUser("user");
    const banMember = await interaction.guild.members.fetch(banUser.id);

    if (!banMember)
      return await interaction.reply({
        content: "User mentioned is not in the server...",
        ephemeral: true,
      });

    let reason = interaction.options.getString("reason");
    if (!reason) reason = "No reason provided...";

    await banMember
      .send({
        content: `You have been banned from a server! Server: ${interaction.guild.name}; Reason: ${reason}`,
      })
      .catch((err) =>
        console.log(
          `User ${banMember} did not receive ban message, is their DM's turned off?`
        )
      );

    await banMember.ban({ reason: reason }).catch((err) => console.error(err));

    await interaction.reply({
      content: `User ${banUser.tag} successfully banned.`,
    });
  },
};
