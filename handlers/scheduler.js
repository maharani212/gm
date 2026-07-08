const fs = require("fs");
const path = require("path");
const axios = require("axios");

const configPath = path.join(__dirname, "..", "data", "config.json");

let config;
try {
  config = JSON.parse(fs.readFileSync(configPath, "utf8"));
} catch {
  config = { autoPost: { channelId: null, intervalMs: 3600000, enabled: false } };
}

function saveConfig() {
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
}

let autoPostTimer = null;

function startAutoPost(client) {
  if (!config.autoPost.enabled || !config.autoPost.channelId) return;

  if (autoPostTimer) clearInterval(autoPostTimer);

  autoPostTimer = setInterval(async () => {
    const channel = client.channels.cache.get(config.autoPost.channelId);
    if (!channel) return;

    try {
      const res = await axios.get("https://www.acepyr.com", { timeout: 10000 });
      const status = res.status === 200 ? "✅ Online" : "⚠️ Issue";
      await channel.send(`**Acepyr Status Update**\nWebsite: ${status}\n${new Date().toLocaleString()}`);
    } catch {
      await channel.send(`⚠️ **Acepyr Status Update**\nWebsite: ❌ Unreachable\n${new Date().toLocaleString()}`);
    }
  }, config.autoPost.intervalMs);

  console.log(`Auto-post scheduled every ${config.autoPost.intervalMs / 60000} min`);
}

function getConfig() {
  return config;
}

function updateAutoPost(channelId, intervalMs) {
  config.autoPost.channelId = channelId || config.autoPost.channelId;
  if (intervalMs) config.autoPost.intervalMs = intervalMs;
  config.autoPost.enabled = true;
  saveConfig();
}

function disableAutoPost() {
  config.autoPost.enabled = false;
  if (autoPostTimer) {
    clearInterval(autoPostTimer);
    autoPostTimer = null;
  }
  saveConfig();
}

function init(client) {
  startAutoPost(client);
}

module.exports = { init, getConfig, updateAutoPost, disableAutoPost };
