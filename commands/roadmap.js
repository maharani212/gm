module.exports = {
  name: "roadmap",
  description: "Tampilkan roadmap Acepyr",

  async execute(interaction) {
    await interaction.editReply(
      "Roadmap Acepyr meliputi pengembangan AI, testnet, dan pertumbuhan ekosistem."
    );
  },

  async executeMessage(message) {
    await message.reply(
      "Roadmap Acepyr meliputi pengembangan AI, testnet, dan pertumbuhan ekosistem."
    );
  },
};
