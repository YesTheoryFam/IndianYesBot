const Discord = require('discord.js');
const bot = new Discord.Client({partials: ["MESSAGE", "REACTION", "CHANNEL"]});
const betabot = new Discord.Client({partials: ["MESSAGE", "REACTION", "CHANNEL"]});

const config = require('./config/config.json');

const states = require('./collections/Roles/stateTags.json');
const serverRoles = require('./collections/Roles/Roles.json');

const messageEvent = require('./events/messages.js');
const memberJoinEvent = require('./events/memberJoin.js');
const customCommands = require('./events/commands.js');
const chatLogs = require('./events/chatLogs.js');



bot.on('ready', () => {
// const botOnNotificationChannel = bot.channels.cache.get('746764608890470470');

    console.log('IndianYesBot is online.');
    // if(!botOnNotificationChannel) return;
    // botOnNotificationChannel.send('restart_success');
    
});

messageEvent(bot);
memberJoinEvent(bot);
customCommands(bot);
chatLogs(bot)





// ===========================================================================!|
// ===========================================================================!|
//                               BETA TEST ZONE
// ==========================================================================÷!|
// ==========================================================================÷!|

// commandtest
bot.on('message', message => {
// const PREFIX = "!";
const serverLogs = message.guild.channels.cache.get('747121287381516399');



//   let args = message.content.substring(PREFIX.length).split(" ");
//   switch(args[0]) {

    

//   }
});






bot.login(config.discord_bot.mainBot);
betabot.login(config.discord_bot.secondaryBot);