const { data } = require("../data/acepyr-data");

const topicMap = {
  overview: {
    label: "Overview",
    build: () =>
      `**${data.overview.title}**\n\n` +
      `*${data.overview.tagline}*\n\n` +
      `${data.overview.description}\n\n` +
      `**Mission:** ${data.overview.mission}`,
  },
  vectors: {
    label: "Vectors",
    build: () => {
      const games = data.vectors.games
        .map((g) => `• **${g.name}** — ${g.description}`)
        .join("\n");
      return `**${data.vectors.title}**\n\n${data.vectors.description}\n\n${games}`;
    },
  },
  "player-stack": {
    label: "Player Stack",
    build: () => {
      const comp = data.playerStack.components
        .map((c) => `• **${c.name}** — ${c.description}`)
        .join("\n");
      return `**${data.playerStack.title}**\n\n${data.playerStack.description}\n\n${comp}`;
    },
  },
  token: {
    label: "$ACEPYR Token",
    build: () => {
      const details = data.token.details.map((d) => `• ${d}`).join("\n");
      return `**${data.token.name}**\n\n${data.token.description}\n\n${details}`;
    },
  },
  stats: {
    label: "Stats",
    build: () =>
      `**Acepyr by the Numbers**\n\n` +
      `• Total Acepyrians: ${data.stats.totalAcepyrians}\n` +
      `• Waitlist: ${data.stats.waitlist}\n` +
      `• Meritocracy: ${data.stats.meritocracy}\n` +
      `• Founder Allocation: ${data.stats.founderAllocation}\n\n` +
      `${data.stats.description}`,
  },
};

module.exports = {
  name: "acepyr",
  description: "Learn about the Acepyr project",

  async execute(interaction) {
    const topic = interaction.options.getString("topic") || "overview";
    const t = topicMap[topic];
    if (!t) {
      return interaction.editReply(
        `Topic not found. Available: ${Object.keys(topicMap).join(", ")}`
      );
    }
    await interaction.editReply(t.build());
  },

  async executeMessage(message, args) {
    const topic = args[0] || "overview";
    const t = topicMap[topic];
    if (!t) {
      const list = Object.keys(topicMap)
        .map((k) => `• \`!acepyr ${k}\``)
        .join("\n");
      return message.reply(
        `Topic not found. Available:\n${list}\n\nTry \`!acepyr overview\``
      );
    }
    await message.reply(t.build());
  },
};
