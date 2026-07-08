module.exports = {
  name: "faq",
  description: "Pertanyaan yang sering diajukan",

  async execute(interaction) {
    await interaction.editReply(
      "**FAQ Acepyr**\n\n" +
      "• Apa itu Acepyr? → Proyek AI berbasis komunitas.\n" +
      "• Bagaimana cara mulai? → Gunakan /acepyr atau /ask.\n" +
      "• Ada testnet? → Ya, lihat roadmap dengan /roadmap.\n" +
      "• Ada token? → Info tokenomics dengan /acepyr token.\n" +
      "• Butuh bantuan? → Gunakan /help."
    );
  },

  async executeMessage(message) {
    await message.reply(
      "**FAQ Acepyr**\n\n" +
      "• Apa itu Acepyr? → Proyek AI berbasis komunitas.\n" +
      "• Bagaimana cara mulai? → Gunakan !acepyr atau !ask.\n" +
      "• Ada testnet? → Ya, lihat roadmap dengan !roadmap.\n" +
      "• Ada token? → Info tokenomics dengan !acepyr token.\n" +
      "• Butuh bantuan? → Gunakan !help."
    );
  },
};
