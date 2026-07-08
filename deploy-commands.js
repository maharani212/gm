require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { REST, Routes, SlashCommandBuilder } = require("discord.js");

const commands = [];
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter(f => f.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(path.join(commandsPath, file));
  if (!command?.name) continue;

  const builder = new SlashCommandBuilder()
    .setName(command.name)
    .setDescription(command.description || "No description");

  if (command.name === "acepyr") {
    builder.addStringOption((opt) =>
      opt
        .setName("topic")
        .setDescription("Choose a topic about Acepyr")
        .setRequired(false)
        .addChoices(
          { name: "Overview", value: "overview" },
          { name: "Vectors", value: "vectors" },
          { name: "Player Stack", value: "player-stack" },
          { name: "$ACEPYR Token", value: "token" },
          { name: "Stats", value: "stats" }
        )
    );
  }

  if (command.name === "ask") {
    builder.addStringOption((opt) =>
      opt
        .setName("question")
        .setDescription("Your question about Acepyr")
        .setRequired(true)
    );
  }

  if (command.name === "autopost") {
    builder.addStringOption((opt) =>
      opt
        .setName("action")
        .setDescription("Choose action")
        .setRequired(false)
        .addChoices(
          { name: "Status", value: "status" },
          { name: "Setup", value: "setup" },
          { name: "Disable", value: "disable" }
        )
    );
    builder.addChannelOption((opt) =>
      opt.setName("channel").setDescription("Target channel").setRequired(false)
    );
    builder.addIntegerOption((opt) =>
      opt
        .setName("minutes")
        .setDescription("Interval in minutes (default 60)")
        .setRequired(false)
    );
  }

  commands.push(builder.toJSON());
}

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log(`Registering ${commands.length} slash commands...`);
    const data = await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands }
    );
    console.log(`Registered ${data.length} commands successfully.`);
  } catch (err) {
    console.error("Failed to register commands:", err);
  }
})();
