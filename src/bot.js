const Discord = require("discord.js");
const bot = new Discord.Client({ partials: ["MESSAGE", "REACTION", "CHANNEL", "GUILD_MEMBER", "USER"] });
const betabot = new Discord.Client({ partials: ["MESSAGE", "REACTION", "CHANNEL", "GUILD_MEMBER", "USER"] });

require("dotenv").config();
const mongo = require("./database/databaseConnect.js");

const message = require("./events/messages.js");
const guildMemberAdd = require('./events/guildMemberAdd');
const guildMemberRemove = require('./events/guildMemberRemove');
const messageReactionAdd = require('./events/messageReactionAdd');
const messageReactionRemove = require('./events/messageReactionRemove');
const messageUpdate = require('./events/messageUpdate');
const messageDelete = require('./events/messageDelete');
const presenceUpdate = require('./events/presenceUpdate');


bot.on("ready", async () => {
    console.log(`${bot.user.username} is online.`);
    await mongo().then(() => console.log('DAtabase connected.'))
    const botOnNotificationChannel = bot.channels.cache.get("746764608890470470");

    if (!botOnNotificationChannel) return;
    botOnNotificationChannel.send("restart_success");
});

message(bot);
guildMemberAdd(bot);
guildMemberRemove(bot);
messageReactionAdd(bot);
messageReactionRemove(bot);
messageUpdate(bot);
messageDelete(bot);
presenceUpdate(bot);

bot.login(process.env.mainBot);
betabot.login(process.env.secondaryBot);  