const Discord = require('discord.js');
const bot = new Discord.Client({partials: ["MESSAGE", "REACTION", "CHANNEL"]});
const betabot = new Discord.Client({partials: ["MESSAGE", "REACTION", "CHANNEL"]});

const config = require('./config/config.json');

const states = require('./collections/Roles/stateTags.json');

const messageEvent = require('./events/messages.js');
// const memberJoinEvent = require('./events/memberJoin.js');


bot.on('ready', () => {
const botOnNotificationChannel = bot.channels.cache.get('746764608890470470');

    console.log('IndianYesBot is online.');
    if(!botOnNotificationChannel) return;
    botOnNotificationChannel.send('restart_success');
    
});

messageEvent(bot);
// memberJoinEvent(bot);




// ===========================================================================!|
// ===========================================================================!|
// ==========================================================================÷!|
// ==========================================================================÷!|

// bot.on('message', message => {

// })


bot.on('messageReactionAdd', async (reaction, user) =>{
  
    if(reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if(user.bot) return;
    // if(!reaction.message.guild) return;
    // if(reaction.message.guild.id !== '701088725605548133') return;
    if(reaction.message.channel.id === '746755589895487488') {
    // if (reaction.message.id === '745420667507179532'){
      if(reaction.emoji.name === '👍') {
        await reaction.message.guild.members.cache.get(user.id).roles.add(states.test1.role);
        
        const thumbsDown = reaction.message.reactions.cache.get(states.test2.emote);
        thumbsDown.users.remove(user.id);
  
        return;
    };

      if(reaction.emoji.name === '👎') {
        await reaction.message.guild.members.cache.get(user.id).roles.add(states.test2.role);
  
        const thumbsUp = reaction.message.reactions.cache.get(states.test1.emote);
        thumbsUp.users.remove(user.id);

        return;
    };
  }
  else {
    return;
  }
  
  });


bot.on('messageReactionRemove', async (reaction, user) =>{

    if(reaction.message.partial) await reaction.message.fetch();
  if (reaction.partial) await reaction.fetch();
  if(user.bot) return;
//   if(!reaction.message.guild) return;
//   if(reaction.message.guild.id !== '701088725605548133') return;
  if(reaction.message.channel.id === '746755589895487488') {
    // if (reaction.message.id === '745420667507179532'){

    if(reaction.emoji.name === '👍') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove("745418771417792634")
      return;
    }
    if(reaction.emoji.name === '👎') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove("745418854091718687")
      return;
  }
}
else {
  return;
}});

bot.login(config.discord_bot.mainBot);
betabot.login(config.discord_bot.secondaryBot);