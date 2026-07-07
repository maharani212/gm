require("dotenv").config();

const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once("ready", () => {
  console.log(`Bot login sebagai ${client.user.tag}`);
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  if (message.content === "!ping") {
    message.reply("Pong! 🏓");
  }

  if (message.content === "!acepyr") {
    message.reply("Acepyr adalah proyek AI yang membantu pengguna memahami proyek, roadmap, tokenomics, testnet, dan FAQ.");
  }

  if (message.content === "!roadmap") {
    message.reply("Roadmap Acepyr meliputi pengembangan AI, testnet, dan pertumbuhan ekosistem.");
  }

  if (message.content === "!faq") {
    message.reply("Tanyakan: !acepyr, !roadmap, !help, !info, atau !ping");
  }

  if (message.content === "!help") {
  message.reply(`
📋 **Daftar Perintah**

🏓 !ping
🤖 !acepyr
🗺️ !roadmap
❓ !faq
ℹ️ !info
  `);
}

  if (message.content === "!info") {
  message.reply(`
🤖 **GM Discord Bot**

Versi: 1.0.0
Developer: maharani212
Library: discord.js
Runtime: Node.js
  `);
}
});

client.login(process.env.DISCORD_TOKEN);