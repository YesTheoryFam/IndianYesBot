const Discord = require("discord.js");
require("dotenv").config();

const bot = new Discord.Client({ partials: ["MESSAGE", "REACTION", "CHANNEL", "GUILD_MEMBER", "USER"] });
const betabot = new Discord.Client({ partials: ["MESSAGE", "REACTION", "CHANNEL", "GUILD_MEMBER", "USER"] });
const mongo = require("./database/databaseConnect.js");

// events
const message = require("./events/messages");
const guildMemberAdd = require('./events/guildMemberAdd');
const guildMemberRemove = require('./events/guildMemberRemove');
const messageReactionAdd = require('./events/messageReactionAdd');
const messageReactionRemove = require('./events/messageReactionRemove');
const messageUpdate = require('./events/messageUpdate');
const messageDelete = require('./events/messageDelete');
const presenceUpdate = require('./events/presenceUpdate');

// functions
const birthdays = require('./events/birthdays');
const serverActivityChartse = require('./functions/server activity/serverActivityUpdate');

bot.on("ready", async () => {
    console.log(`${bot.user.username} is online.`);
    await mongo().then(console.log('Database connected.'))
    serverActivityChartse(bot)

    const botOnNotificationChannel = bot.channels.cache.get("746764608890470470");

    if (botOnNotificationChannel) {
        botOnNotificationChannel.send("restart_success");
    }
});

message(bot, betabot);
guildMemberAdd(bot);
guildMemberRemove(bot);
messageReactionAdd(bot);
messageReactionRemove(bot);
messageUpdate(bot);
messageDelete(bot);
presenceUpdate(bot);

birthdays(bot);

bot.login(process.env.mainBot);
betabot.login(process.env.secondaryBot);  