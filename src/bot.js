const Discord = require('discord.js');
const bot = new Discord.Client({partials: ["MESSAGE", "REACTION", "CHANNEL"]});
const betabot = new Discord.Client({partials: ["MESSAGE", "REACTION", "CHANNEL"]});

const config = require('./config/config.json');

const states = require('./collections/Roles/stateTags.json');

const messageEvent = require('./events/messages.js');
// const memberJoinEvent = require('./events/memberJoin.js');
const customCommands = require('./events/commands.js');
const chatLogs = require('./events/chatLogs.js');




bot.on('ready', () => {
// const botOnNotificationChannel = bot.channels.cache.get('746764608890470470');

    console.log('IndianYesBot is online.');
    // if(!botOnNotificationChannel) return;
    // botOnNotificationChannel.send('restart_success');
    
});

messageEvent(bot);
// memberJoinEvent(bot);
customCommands(bot);
chatLogs(bot)





// ===========================================================================!|
// ===========================================================================!|
//                                TEST ZONE
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


bot.on('messageReactionAdd', async (reaction, user) =>{
  console.log('reacted');

  const regionSelectChannel = reaction.message.guild.channels.cache.get('746849042197118987');
  const southRegion = reaction.message.guild.channels.cache.get('747508674205057145');
  const northeastRegion = reaction.message.guild.channels.cache.get('747509081362792639');
  const northRegion = reaction.message.guild.channels.cache.get('747508740714135672');
  const centralRegion = reaction.message.guild.channels.cache.get('747508926936907787');
  const eastRegion = reaction.message.guild.channels.cache.get('747508785115037828');
  const westRegion = reaction.message.guild.channels.cache.get('747508857726566460');
  const islandRegion = reaction.message.guild.channels.cache.get('747508979931939038');
  
    if(reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if(user.bot) return;


    if(reaction.message.channel.id === '746755589895487488') {

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
  };

// north
  if(reaction.message.channel.id == regionSelectChannel.id) {
    console.log('region select channel');


    if(reaction.emoji.name === states.north.emoji) {
      console.log('north emote');
      await reaction.message.guild.members.cache.get(user.id).roles.add(states.north.role);

      const emoji2 = reaction.message.reactions.cache.get(states.central.emoji);
      const emoji3 = reaction.message.reactions.cache.get(states.east.emoji);
      const emoji4 = reaction.message.reactions.cache.get(states.west.emoji);
      const emoji5 = reaction.message.reactions.cache.get(states.south.emoji);
      const emoji6 = reaction.message.reactions.cache.get(states.islands.emoji);
      const emoji7 = reaction.message.reactions.cache.get(states.northeast.emoji);

      emoji2.users.remove(user.id);
      emoji3.users.remove(user.id);
      emoji4.users.remove(user.id);
      emoji5.users.remove(user.id);
      emoji6.users.remove(user.id);
      emoji7.users.remove(user.id);

      return;
    };

    // central
    if(reaction.emoji.name === states.central.emoji) {
      await reaction.message.guild.members.cache.get(user.id).roles.add(states.central.role);

      const emoji2 = reaction.message.reactions.cache.get(states.north.emoji);
      const emoji3 = reaction.message.reactions.cache.get(states.east.emoji);
      const emoji4 = reaction.message.reactions.cache.get(states.west.emoji);
      const emoji5 = reaction.message.reactions.cache.get(states.south.emoji);
      const emoji6 = reaction.message.reactions.cache.get(states.islands.emoji);
      const emoji7 = reaction.message.reactions.cache.get(states.northeast.emoji);

      emoji2.users.remove(user.id);
      emoji3.users.remove(user.id);
      emoji4.users.remove(user.id);
      emoji5.users.remove(user.id);
      emoji6.users.remove(user.id);
      emoji7.users.remove(user.id);

      return;
    };
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
      await reaction.message.guild.members.cache.get(user.id).roles.remove(states.test1.role)
      return;
    }
    if(reaction.emoji.name === '👎') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove(states.test2.role)
      return;
  }
}
else {
  return;
}});


bot.on('message', message =>{
  const regionSelectChannel = message.guild.channels.cache.get('746849042197118987');
  const southRegion = message.guild.channels.cache.get('747508674205057145');
  const northeastRegion = message.guild.channels.cache.get('747509081362792639');
  const northRegion = message.guild.channels.cache.get('747508740714135672');
  const centralRegion = message.guild.channels.cache.get('747508926936907787');
  const eastRegion = message.guild.channels.cache.get('747508785115037828');
  const westRegion = message.guild.channels.cache.get('747508857726566460');
  const islandRegion = message.guild.channels.cache.get('747508979931939038');
  
      if (!message.author.bot) return;
  
      if (message.channel == regionSelectChannel){
          message.react(states.north.emoji);
          message.react(states.central.emoji);
          message.react(states.east.emoji);
          message.react(states.west.emoji);
          message.react(states.south.emoji);
          message.react(states.northeast.emoji);
          message.react(states.islands.emoji);
      };
  
      if (message.channel == southRegion) {
          message.react(states.south.telengana.emoji);
          message.react(states.south.andraPradesh.emoji);
          message.react(states.south.karnataka.emoji);
          message.react(states.south.tamilNadu.emoji);
          message.react(states.south.puduchery.emoji);
          message.react(states.south.kerala.emoji);
      };
  
      if (message.channel == northeastRegion) {
          message.react(states.northeast.sikkim.emoji);
          message.react(states.northeast.assam.emoji);
          message.react(states.northeast.nagaland.emoji);
          message.react(states.northeast.meghalaya.emoji);
          message.react(states.northeast.manipur.emoji);
          message.react(states.northeast.mizoram.emoji);
          message.react(states.northeast.tripura.emoji);
      };
  
      if (message.channel == northRegion) {
          message.react(states.north.ladhak.emoji);
          message.react(states.north.jammuandkashmir.emoji);
          message.react(states.north.himachalPradesh.emoji);
          message.react(states.north.chandigarh.emoji);
          message.react(states.north.haryana.emoji);
          message.react(states.north.delhi.emoji);
          message.react(states.north.rajasthan.emoji);
      };
  
      if (message.channel == centralRegion) {
          message.react(states.central.uttarakhand.emoji);
          message.react(states.central.uttarPradesh.emoji);
          message.react(states.central.madhyaPradesh.emoji);
          message.react(states.central.chhattisgarh.emoji);
      };
  
      if (message.channel == eastRegion) {
          message.react(states.east.bihar.emoji);
          message.react(states.east.jharkhand.emoji);
          message.react(states.east.westBengal.emoji);
          message.react(states.east.odisha.emoji);
      };
  
      if (message.channel == westRegion) {
          message.react(states.west.gujarat.emoji);
          message.react(states.west.maharashtra.emoji);
          message.react(states.west.goa.emoji);
          message.react(states.west.DNH_DnD.emoji);
      };
  
      if (message.channel == islandRegion) {
          message.react(states.islands.andamanNicobar.emoji);
          message.react(states.islands.lakshadweep.emoji);
      };
    });


bot.login(config.discord_bot.mainBot);
betabot.login(config.discord_bot.secondaryBot);