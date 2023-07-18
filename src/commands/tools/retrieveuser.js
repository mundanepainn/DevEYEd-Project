const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('retrieveuser')
    .setDescription('Retrieves information about mentioned user')
    .addUserOption((option) =>
      option
        .setName('user')
        .setDescription('The username of the mentioned user')
        .setRequired(false)
    ),
    async execute(interaction) {
        const user = interaction.options.getUser('user') || interaction.user;
        const member = await interaction.guild.members.fetch(user.id);
        const icon = user.displayAvatarURL();
        const tag = user.tag;

        const embed = new EmbedBuilder()
        .setColor(0x000)
        .setThumbnail(icon)
        .setAuthor({ name: tag, iconURL: icon })
        .addFields({ name: 'Member', value: `${user}`, inline: false })
        .addFields({ name: 'Roles', value: `${member.roles.cache.map(r => r).join(' ')}`, inline: false})
        .addFields({ name: 'Joined Server', value: `<t:${parseInt(member.joinedAt / 1000)}:R>`, inline: true})
        .addFields({ name: 'Joined Discord', value: `<t:${parseInt(user.createdAt / 1000)}:R>`, inline: true})
        .setFooter({ text: `User ID: ${user.id}`})
        .setTimestamp()

        await interaction.reply({ embeds: [embed] });
    }
};
