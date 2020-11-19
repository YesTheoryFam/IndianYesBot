const Discord = require("discord.js");
const bot = new Discord.Client({ partials: ["MESSAGE", "REACTION", "CHANNEL"] });
const betabot = new Discord.Client({ partials: ["MESSAGE", "REACTION", "CHANNEL"] });

require("dotenv").config();
const mongo = require("./config/databaseConnect.js");

const messageEvent = require("./events/messages.js");
const memberJoinEvent = require("./events/memberJoin.js");
const customCommands = require("./events/commands.js");
const chatLogs = require("./events/chatLogs.js");
const messageCounter = require("./database/events/messageCounter.js");
const activityGroups = require('./database/events/activityGroups');
const hobbies = require('./events/hobbies');

bot.on("ready", async () => {
    console.log("IndianYesBot is online.");
    await mongo().then(() => console.log('DAtabase connected.'))
    const botOnNotificationChannel = bot.channels.cache.get("746764608890470470");

    if (!botOnNotificationChannel) return;
    botOnNotificationChannel.send("restart_success");
});

messageEvent(bot);
memberJoinEvent(bot);
customCommands(bot);
chatLogs(bot);
messageCounter(bot);
activityGroups(bot);
hobbies(bot);

bot.login(process.env.mainBot);
betabot.login(process.env.secondaryBot);  