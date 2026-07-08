process.on("unhandledRejection", (err) => console.error("Unhandled:", err?.message || err));

require("dotenv").config();
const fs = require("fs");
const path = require("path");
const express = require("express");
const { Client, GatewayIntentBits, Collection } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.commands = new Collection();

const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter(f => f.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(path.join(commandsPath, file));
  if (command?.name) {
    client.commands.set(command.name, command);
  }
}

client.once("ready", () => {
  console.log(`Bot login sebagai ${client.user.tag}`);
  require("./handlers/scheduler").init(client);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  await interaction.deferReply().catch(() => {});

  try {
    await command.execute(interaction);
  } catch (err) {
    console.error(`Error /${interaction.commandName}:`, err.message || err);
    await interaction.editReply("Terjadi kesalahan.").catch(() => {});
  }
});

client.on("messageCreate", async (message) => {
  if (message.author.bot || !message.content.startsWith("!")) return;

  const args = message.content.slice(1).split(/\s+/);
  const commandName = args.shift()?.toLowerCase();
  const command = client.commands.get(commandName);
  if (!command) return;

  try {
    if (command.executeMessage) {
      await command.executeMessage(message, args);
    }
  } catch (err) {
    console.error(`Error !${commandName}:`, err);
    await message.reply("Terjadi kesalahan.").catch(() => {});
  }
});

const app = express();
app.get("/", (req, res) => res.send("Bot aktif"));
app.listen(3000, () => console.log("Health server on :3000"));

client.login(process.env.DISCORD_TOKEN);
