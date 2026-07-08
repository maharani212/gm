module.exports = {
  name: "ping",
  description: "Check bot response",

  async execute(interaction) {
    await interaction.editReply("Pong! 🏓");
  },

  async executeMessage(message) {
    await message.reply("Pong! 🏓");
  },
};
