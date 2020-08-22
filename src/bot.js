const Discord = require('discord.js');
const bot = new Discord.Client({partials: ["MESSAGE", "REACTION", "CHANNEL"]});
const config = require('./config/config.json');

const messageEvent = require('./events/messages.js');


bot.on('ready', () => {
const botOnNotificationChannel = bot.channels.cache.get('746764608890470470');

    console.log('IndianYesBot is online.');
    botOnNotificationChannel.send('restart_success');
    
});

messageEvent(bot);




bot.login(config.discord_bot.mainBot);