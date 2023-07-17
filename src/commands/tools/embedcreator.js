const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("embedcreator")
    .setDescription("Creates an embed")
    .addStringOption((option) =>
      option
        .setName("title")
        .setDescription("Title of the emded")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("description")
        .setDescription("Description of the emded")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("image")
        .setDescription("Image of the emded")
        .setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName("thumbnail")
        .setDescription("Thumbnail of the emded")
        .setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName("field_name")
        .setDescription("Field-name of embed")
        .setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName("field_value")
        .setDescription("Field-value of the emded")
        .setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName("footer")
        .setDescription("Footer of embed")
        .setRequired(false)
    ),
  async execute(interaction) {
    const { options } = interaction;

    const title = options.getString("title");
    const description = options.getString("description");
    const image = options.getString("image");
    const thumbnail = options.getString("thumbnail");
    const field_name = options.getString("field_name") || ' ';
    const field_value = options.getString("field_value") || ' ';
    const footer = options.getString("footer") || ' ';

    if (image) {
      if (!image.startsWith("http"))
        return await interaction.reply({
          content: "You cannot make this your image",
          ephemeral: true,
        });
    }

    if (thumbnail) {
      if (thumbnail.startsWith("http"))
        return await interaction.reply({
          content: "You cannot make this your thumbnail",
          ephemeral: true,
        });
    }

    const embed = new EmbedBuilder()
    .setTitle(title)
    .setDescription(description)
    .setColor(0x0000)
    .setImage(image)
    .setThumbnail(thumbnail)
    .setFields({ name: `${field_name}`, value: `${field_value}`})
    .setFooter({text: `${footer}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})

    await interaction.reply({content: "Your embed has been created", ephemeral: true});

    await interaction.channel.send({embeds: [embed]});

  },
};
