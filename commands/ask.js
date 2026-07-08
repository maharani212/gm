const { data, search } = require("../data/acepyr-data");

module.exports = {
  name: "ask",
  description: "Ask anything about the Acepyr project",

  async execute(interaction) {
    const question = interaction.options.getString("question");
    if (!question) {
      return interaction.editReply("Please ask a question about Acepyr.");
    }

    const results = search(question);
    if (results.length === 0) {
      return interaction.editReply(
        "I couldn't find a specific answer for that. Try /acepyr with a topic, or rephrase your question."
      );
    }

    const top = results[0];
    await interaction.editReply(`**${top.q}**\n\n${top.a}`);
  },

  async executeMessage(message, args) {
    if (args.length === 0) {
      return message.reply(
        "Usage: `!ask <question>` — ask anything about Acepyr."
      );
    }

    const question = args.join(" ");
    const results = search(question);

    if (results.length === 0) {
      return message.reply(
        `I couldn't find a specific answer for that. Try a different question!`
      );
    }

    const top = results[0];
    await message.reply(`**${top.q}**\n\n${top.a}`);
  },
};
