const db = require("quick.db");
const Discord = require("discord.js");

module.exports = {
  name: "vt",
  modOnly: true,
  gameOnly: true,
  run: async (message, args, client) => {
    if (
      (message.member && !message.member.hasPermission("MANAGE_MESSAGES")) &&
      args[1] == process.env.SHADOW
    )
      return;
    if (message.guild.id != "472261911526768642") return;

    let wwsVote = await db.fetch(`wwsVote_${message.guild.id}`);
    let commandEnabled = await db.fetch(`commandEnabled_${message.guild.id}`);
    let voteChat = message.guild.channels.cache.find(
      (c) => c.name === "vote-chat"
    );
    let dayChat = message.guild.channels.cache.find(
      (c) => c.name === "day-chat"
    );
    let aliveRole = message.guild.roles.cache.find((r) => r.name === "Alive");
    db.set(`wwsVote_${message.guild.id}`, "NO");
    db.set(`skippedpl`, 0);
    let votes = Math.floor(parseInt(aliveRole.members.size) / 2);
    voteChat.send(`<@&${aliveRole.id}>`);
    dayChat.send(
      `Get ready to vote! (${votes} vote${votes == 1 ? "" : "s"} required)`
    );
    db.set(`commandEnabled_${message.guild.id}`, `yes`);
    setTimeout(() => {
      if (db.get(`isNight_${message.guild.id}`) != "yes" && args[0] != "nm") {
        if(message.slashGenerate) return client.channels.cache.get("606131484532801549").send("Unable to autostart the night!")
        client.commands.get("night2").run(message, args, client);
      }
    }, 45000);
  },
};
