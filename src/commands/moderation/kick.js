const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kicks a user from the server")
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
    const kickMember = await interaction.guild.members
      .fetch(kickUser.id)
      .catch((err) =>
        console.log("User does not exist or is not in this server")
      );
    const guild = interaction.guild;

    if (!kickMember)
      return await interaction.reply({
        content: `${kickUser} mentioned is not in the server...`,
        ephemeral: true,
      });

    if (kickUser == guild.ownerId)
      return await interaction.reply({
        content: `Cannot kick the server owner`,
        ephemeral: true,
      });

    let reason = interaction.options.getString("reason");
    if (!reason) reason = "No reason provided...";

    const memberEmbed = new EmbedBuilder()
      .setColor(0x000)
      .setTitle("You have been Kicked!")
      .setDescription(`Reason: ${reason}`)
      .setThumbnail(guild.iconURL())
      .setFooter({ text: `Server: ${guild.name}` })
      .setTimestamp();

    await kickMember
      .send({
        embeds: [memberEmbed],
      })
      .catch((err) =>
        console.log(
          `User ${kickMember} did not receive kick message, is their DM's turned off?`
        )
      );

    await kickMember
      .kick({ reason: reason })
      .catch((err) => console.error(err));

    const guildEmbed = new EmbedBuilder()
      .setColor(0x000)
      .setTitle(`A member has been successfully kicked!`)
      .setDescription(`*Who?* ${kickUser}\n*Reason:* ${reason}`)
      .setThumbnail(guild.iconURL())
      .setTimestamp();

    await interaction.reply({
      embeds: [guildEmbed],
    });
  },
};
