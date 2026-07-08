const list = [
  { n: "ping", d: "Check bot response" },
  { n: "acepyr", d: "Learn about Acepyr (overview, vectors, token, stats)" },
  { n: "ask", d: "Ask anything about Acepyr" },
  { n: "autopost", d: "Auto-post Acepyr status to channel" },
  { n: "roadmap", d: "Tampilkan roadmap" },
  { n: "faq", d: "Pertanyaan sering diajukan" },
  { n: "info", d: "Info bot" },
  { n: "help", d: "Tampilkan bantuan" },
];

module.exports = {
  name: "commands",
  description: "Show all available commands",

  async execute(interaction) {
    await interaction.editReply("**Command List**\n\n" + list.map(c => `• **/${c.n}** — ${c.d}`).join("\n"));
  },

  async executeMessage(message) {
    await message.reply("**Command List**\n\n" + list.map(c => `• **!${c.n}** — ${c.d}`).join("\n"));
  },
};
