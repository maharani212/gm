const scheduler = require("../handlers/scheduler");

module.exports = {
  name: "autopost",
  description: "Manage automatic status posting",

  async execute(interaction) {
    const action = interaction.options.getString("action") || "status";

    if (action === "status") {
      const cfg = scheduler.getConfig().autoPost;
      return interaction.editReply(
        cfg.enabled
          ? `✅ Auto-post aktif di <#${cfg.channelId}> setiap ${cfg.intervalMs / 60000} menit`
          : "❌ Auto-post belum diaktifkan. Gunakan `/autopost action:setup`"
      );
    }

    if (action === "setup") {
      const channel = interaction.options.getChannel("channel") || interaction.channel;
      const interval = interaction.options.getInteger("minutes") || 60;
      scheduler.updateAutoPost(channel.id, interval * 60000);
      return interaction.editReply(`✅ Auto-post diatur ke ${channel} setiap **${interval} menit**. Restart bot agar aktif.`);
    }

    if (action === "disable") {
      scheduler.disableAutoPost();
      return interaction.editReply("❌ Auto-post dinonaktifkan.");
    }
  },

  async executeMessage(message, args) {
    const sub = args[0];
    if (sub === "setup") {
      const channel = message.mentions.channels.first() || message.channel;
      const interval = parseInt(args[1]) || 60;
      scheduler.updateAutoPost(channel.id, interval * 60000);
      return message.reply(`✅ Auto-post diatur ke ${channel} setiap **${interval} menit**. Restart bot agar aktif.`);
    }
    if (sub === "disable") {
      scheduler.disableAutoPost();
      return message.reply("❌ Auto-post dinonaktifkan.");
    }
    const cfg = scheduler.getConfig().autoPost;
    return message.reply(
      cfg.enabled
        ? `✅ Auto-post aktif di <#${cfg.channelId}> setiap ${cfg.intervalMs / 60000} menit`
        : "❌ Auto-post belum aktif. Gunakan \`!autopost setup <menit>\`"
    );
  },
};
