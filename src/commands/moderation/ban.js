const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");

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
    const banMember = await interaction.guild.members
      .fetch(banUser.id)
      .catch((err) => console.log("User is not in this server"));
    const guild = interaction.guild;

    if (!banMember)
      return await interaction.reply({
        content: `${banUser} mentioned is not in the server...`,
        ephemeral: true,
      });

    let reason = interaction.options.getString("reason");
    if (!reason) reason = "No reason provided...";

    const memberEmbed = new EmbedBuilder()
      .setColor(0x000)
      .setTitle("You have been banned!")
      .setDescription(`Reason: ${reason}`)
      .setThumbnail(guild.iconURL())
      .setFooter({ text: `Server: ${guild.name}` })
      .setTimestamp();

    await banMember
      .send({
        embeds: [memberEmbed],
      })
      .catch((err) =>
        console.log(
          `User ${banMember} did not receive ban message, is their DM's turned off?`
        )
      );

    await banMember.ban({ reason: reason }).catch((err) => console.error(err));

    const guildEmbed = new EmbedBuilder()
      .setColor(0x000)
      .setTitle(`A member has been successfully banned!`)
      .setDescription(`*Who?* ${banUser}\n*Reason:* ${reason}`)
      .setThumbnail(guild.iconURL())
      .setTimestamp();

    await interaction.reply({
      embeds: [guildEmbed],
    });
  },
};
