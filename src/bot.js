const Discord = require('discord.js');
const bot = new Discord.Client({partials: ["MESSAGE", "REACTION", "CHANNEL"]});
const betabot = new Discord.Client({partials: ["MESSAGE", "REACTION", "CHANNEL"]});
const mongo = require('./config/databaseConnect');
require('dotenv').config();

const states = require('./collections/Roles/stateTags.json');
const serverRoles = require('./collections/Roles/Roles.json');

const messageEvent = require('./events/messages.js');
const memberJoinEvent = require('./events/memberJoin.js');
const customCommands = require('./events/commands.js');
const chatLogs = require('./events/chatLogs.js');
const messageCounter = require('./database/events/messageCounter.js');



bot.on('ready', () => {
const botOnNotificationChannel = bot.channels.cache.get('746764608890470470');

    console.log('IndianYesBot is online.');
    if(!botOnNotificationChannel) return;
    botOnNotificationChannel.send('restart_success');
    
});

messageEvent(bot);
memberJoinEvent(bot);
customCommands(bot);
chatLogs(bot)
messageCounter(bot)





// ===========================================================================!|
// ===========================================================================!|
//                               BETA TEST ZONE                               ||
// ==========================================================================÷!|
// ==========================================================================÷!|

// commandtest
bot.on('message', async (message) => {
const serverLogs = message.guild.channels.cache.get('747121287381516399');

//message counter



// =======================================

// const PREFIX = "!";
// if(message.content.startsWith(PREFIX)){
// let args = message.content.substring(PREFIX.length).split(" ");
// switch(args[0]) {



// }
// }
});


bot.login(process.env.mainBot);
betabot.login(process.env.secondaryBot);