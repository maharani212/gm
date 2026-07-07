module.exports = {
  name: "help",

  execute(message) {
    message.reply(
      "**Daftar Perintah**\n" +
      "🏓 !ping\n" +
      "🤖 !acepyr\n" +
      "🗺️ !roadmap\n" +
      "❓ !faq\n" +
      "ℹ️ !info"
    );
  },
};