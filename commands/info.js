module.exports = {
  name: "info",
  description: "Informasi tentang bot",

  async execute(interaction) {
    await interaction.editReply(
      "**GM Discord Bot**\n\n" +
      "Versi: 2.0.0\n" +
      "Developer: maharani212\n" +
      "Library: discord.js v14\n" +
      "Runtime: Node.js\n" +
      "Fitur: Slash commands, Q&A Acepyr, Health server"
    );
  },

  async executeMessage(message) {
    await message.reply(
      "**GM Discord Bot**\n\n" +
      "Versi: 2.0.0\n" +
      "Developer: maharani212\n" +
      "Library: discord.js v14\n" +
      "Runtime: Node.js\n" +
      "Fitur: Slash commands, Q&A Acepyr, Health server"
    );
  },
};
