# GM Discord Bot

A Discord bot for the **Acepyr** community — answers questions about the Acepyr behavioral economy project, including tokenomics, roadmap, games, and community stats.

## Features

- **/ask** — Ask anything about Acepyr (Q&A engine)
- **/acepyr** — Browse topics: overview, vectors, player-stack, token, stats
- **/ping** — Check bot response
- **/roadmap** — Development roadmap
- **/faq** — Frequently asked questions
- **/help** — Show available commands
- **/info** — Bot information

## Installation

```bash
git clone https://github.com/maharani212/gm.git
cd gm
npm install
```

## Configuration

Create a `.env` file:

```env
DISCORD_TOKEN=YOUR_DISCORD_TOKEN
CLIENT_ID=YOUR_CLIENT_ID
```

## Usage

Register slash commands (run once):

```bash
node deploy-commands.js
```

Start the bot:

```bash
node index.js
```

## Project Structure

```
commands/       — Slash + prefix command files
data/           — Knowledge base (acepyr project data)
images/         — Screenshots
index.js        — Main bot entry point
deploy-commands.js  — Slash command registration
SKILL.md        — AI skill definition (ProductClank)
```

## Tech Stack

- Node.js
- discord.js v14
- dotenv
- Express (health checks)

## License

MIT License
