const Discord = require('discord.js');
const bot = new Discord.Client({partials: ["MESSAGE", "REACTION", "CHANNEL"]});
const betabot = new Discord.Client({partials: ["MESSAGE", "REACTION", "CHANNEL"]});

const config = require('./config/config.json');

const states = require('./collections/Roles/stateTags.json');
const serverRoles = require('./collections/Roles/Roles.json');

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
  // console.log('reacted');

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

  };

// Select Region
  if(reaction.message.channel == regionSelectChannel) {
    // console.log('region select channel');

    // north
    if(reaction.emoji.name === states.north.emoji) {
      // console.log('north emote');
      await reaction.message.guild.members.cache.get(user.id).roles.add(states.north.role);
      northRegion.send(`Great! Now select your state, ${user}.`);

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

    // east
    if(reaction.emoji.name === states.east.emoji) {
      await reaction.message.guild.members.cache.get(user.id).roles.add(states.east.role);

      const emoji2 = reaction.message.reactions.cache.get(states.north.emoji);
      const emoji3 = reaction.message.reactions.cache.get(states.central.emoji);
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

    // west
    if(reaction.emoji.name === states.west.emoji) {
      await reaction.message.guild.members.cache.get(user.id).roles.add(states.west.role);

      const emoji2 = reaction.message.reactions.cache.get(states.north.emoji);
      const emoji3 = reaction.message.reactions.cache.get(states.east.emoji);
      const emoji4 = reaction.message.reactions.cache.get(states.central.emoji);
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

    // south
    if(reaction.emoji.name === states.south.emoji) {
      await reaction.message.guild.members.cache.get(user.id).roles.add(states.south.role);

      const emoji2 = reaction.message.reactions.cache.get(states.north.emoji);
      const emoji3 = reaction.message.reactions.cache.get(states.east.emoji);
      const emoji4 = reaction.message.reactions.cache.get(states.west.emoji);
      const emoji5 = reaction.message.reactions.cache.get(states.central.emoji);
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

    // islands 
    if(reaction.emoji.name === states.islands.emoji) {
      await reaction.message.guild.members.cache.get(user.id).roles.add(states.islands.role);

      const emoji2 = reaction.message.reactions.cache.get(states.north.emoji);
      const emoji3 = reaction.message.reactions.cache.get(states.east.emoji);
      const emoji4 = reaction.message.reactions.cache.get(states.west.emoji);
      const emoji5 = reaction.message.reactions.cache.get(states.south.emoji);
      const emoji6 = reaction.message.reactions.cache.get(states.central.emoji);
      const emoji7 = reaction.message.reactions.cache.get(states.northeast.emoji);

      emoji2.users.remove(user.id);
      emoji3.users.remove(user.id);
      emoji4.users.remove(user.id);
      emoji5.users.remove(user.id);
      emoji6.users.remove(user.id);
      emoji7.users.remove(user.id);

      return;
    };

    // northeast 
    if(reaction.emoji.name === states.northeast.emoji) {
      await reaction.message.guild.members.cache.get(user.id).roles.add(states.northeast.role);

      const emoji2 = reaction.message.reactions.cache.get(states.north.emoji);
      const emoji3 = reaction.message.reactions.cache.get(states.east.emoji);
      const emoji4 = reaction.message.reactions.cache.get(states.west.emoji);
      const emoji5 = reaction.message.reactions.cache.get(states.south.emoji);
      const emoji6 = reaction.message.reactions.cache.get(states.islands.emoji);
      const emoji7 = reaction.message.reactions.cache.get(states.central.emoji);

      emoji2.users.remove(user.id);
      emoji3.users.remove(user.id);
      emoji4.users.remove(user.id);
      emoji5.users.remove(user.id);
      emoji6.users.remove(user.id);
      emoji7.users.remove(user.id);

      return;
    };
  };

  // north region
  if(reaction.message.channel == northRegion) {

    // ladhak
    if(reaction.emoji.name === states.north.ladhak.emoji){
      await reaction.message.guild.members.cache.get(user.id).roles.add(states.north.ladhak.role)
      await reaction.message.guild.members.cache.get(user.id).roles.remove(states.north.role)
      await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.YesFamMember)
      await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.badgeSeparator)


      const emoji2 = reaction.message.reactions.cache.get(states.north.chandigarh.emoji);
      const emoji3 = reaction.message.reactions.cache.get(states.north.delhi.emoji);
      const emoji4 = reaction.message.reactions.cache.get(states.north.haryana.emoji);
      const emoji5 = reaction.message.reactions.cache.get(states.north.himachalPradesh.emoji);
      const emoji6 = reaction.message.reactions.cache.get(states.north.jammuandkashmir.emoji);
      const emoji7 = reaction.message.reactions.cache.get(states.north.punjab.emoji);
      const emoji8 = reaction.message.reactions.cache.get(states.north.rajasthan.emoji);

      emoji2.users.remove(user.id);
      emoji3.users.remove(user.id);
      emoji4.users.remove(user.id);
      emoji5.users.remove(user.id);
      emoji6.users.remove(user.id);
      emoji7.users.remove(user.id);
      emoji8.users.remove(user.id);

      return;
    };

    // Chandigarh
    if(reaction.emoji.name === states.north.chandigarh.emoji){
      await reaction.message.guild.members.cache.get(user.id).roles.add(states.north.chandigarh.role);
      await reaction.message.guild.members.cache.get(user.id).roles.remove(states.north.role);
      await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.YesFamMember);
      await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.badgeSeparator);

      const emoji2 = reaction.message.reactions.cache.get(states.north.ladhak.emoji);
      const emoji3 = reaction.message.reactions.cache.get(states.north.delhi.emoji);
      const emoji4 = reaction.message.reactions.cache.get(states.north.haryana.emoji);
      const emoji5 = reaction.message.reactions.cache.get(states.north.himachalPradesh.emoji);
      const emoji6 = reaction.message.reactions.cache.get(states.north.jammuandkashmir.emoji);
      const emoji7 = reaction.message.reactions.cache.get(states.north.punjab.emoji);
      const emoji8 = reaction.message.reactions.cache.get(states.north.rajasthan.emoji);

      emoji2.users.remove(user.id);
      emoji3.users.remove(user.id);
      emoji4.users.remove(user.id);
      emoji5.users.remove(user.id);
      emoji6.users.remove(user.id);
      emoji7.users.remove(user.id);
      emoji8.users.remove(user.id);

      return;
    };

    // delhi
    if(reaction.emoji.name === states.north.delhi.emoji){
      await reaction.message.guild.members.cache.get(user.id).roles.add(states.north.delhi.role);
      await reaction.message.guild.members.cache.get(user.id).roles.add(states.north.chandigarh.role);
      await reaction.message.guild.members.cache.get(user.id).roles.remove(states.north.role);
      await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.YesFamMember);
      await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.badgeSeparator);

      const emoji2 = reaction.message.reactions.cache.get(states.north.chandigarh.emoji);
      const emoji3 = reaction.message.reactions.cache.get(states.north.ladhak.emoji);
      const emoji4 = reaction.message.reactions.cache.get(states.north.haryana.emoji);
      const emoji5 = reaction.message.reactions.cache.get(states.north.himachalPradesh.emoji);
      const emoji6 = reaction.message.reactions.cache.get(states.north.jammuandkashmir.emoji);
      const emoji7 = reaction.message.reactions.cache.get(states.north.punjab.emoji);
      const emoji8 = reaction.message.reactions.cache.get(states.north.rajasthan.emoji);

      emoji2.users.remove(user.id);
      emoji3.users.remove(user.id);
      emoji4.users.remove(user.id);
      emoji5.users.remove(user.id);
      emoji6.users.remove(user.id);
      emoji7.users.remove(user.id);
      emoji8.users.remove(user.id);

      return;
    };

    // haryana
    if(reaction.emoji.name === states.north.haryana.emoji){
      await reaction.message.guild.members.cache.get(user.id).roles.add(states.north.haryana.role);
      await reaction.message.guild.members.cache.get(user.id).roles.add(states.north.chandigarh.role);
      await reaction.message.guild.members.cache.get(user.id).roles.remove(states.north.role);
      await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.YesFamMember);
      await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.badgeSeparator);

      const emoji2 = reaction.message.reactions.cache.get(states.north.chandigarh.emoji);
      const emoji3 = reaction.message.reactions.cache.get(states.north.delhi.emoji);
      const emoji4 = reaction.message.reactions.cache.get(states.north.ladhak.emoji);
      const emoji5 = reaction.message.reactions.cache.get(states.north.himachalPradesh.emoji);
      const emoji6 = reaction.message.reactions.cache.get(states.north.jammuandkashmir.emoji);
      const emoji7 = reaction.message.reactions.cache.get(states.north.punjab.emoji);
      const emoji8 = reaction.message.reactions.cache.get(states.north.rajasthan.emoji);

      emoji2.users.remove(user.id);
      emoji3.users.remove(user.id);
      emoji4.users.remove(user.id);
      emoji5.users.remove(user.id);
      emoji6.users.remove(user.id);
      emoji7.users.remove(user.id);
      emoji8.users.remove(user.id);

      return;
    };

    // himachal pradesh
    if(reaction.emoji.name === states.north.himachalPradesh.emoji){
      await reaction.message.guild.members.cache.get(user.id).roles.add(states.north.himachalPradesh.role);
      await reaction.message.guild.members.cache.get(user.id).roles.add(states.north.chandigarh.role);
      await reaction.message.guild.members.cache.get(user.id).roles.remove(states.north.role);
      await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.YesFamMember);
      await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.badgeSeparator);

      const emoji2 = reaction.message.reactions.cache.get(states.north.chandigarh.emoji);
      const emoji3 = reaction.message.reactions.cache.get(states.north.delhi.emoji);
      const emoji4 = reaction.message.reactions.cache.get(states.north.haryana.emoji);
      const emoji5 = reaction.message.reactions.cache.get(states.north.ladhak.emoji);
      const emoji6 = reaction.message.reactions.cache.get(states.north.jammuandkashmir.emoji);
      const emoji7 = reaction.message.reactions.cache.get(states.north.punjab.emoji);
      const emoji8 = reaction.message.reactions.cache.get(states.north.rajasthan.emoji);

      emoji2.users.remove(user.id);
      emoji3.users.remove(user.id);
      emoji4.users.remove(user.id);
      emoji5.users.remove(user.id);
      emoji6.users.remove(user.id);
      emoji7.users.remove(user.id);
      emoji8.users.remove(user.id);

      return;
    };

    // Jammu and Kashmir
    if(reaction.emoji.name === states.north.jammuandkashmir.emoji){
      await reaction.message.guild.members.cache.get(user.id).roles.add(states.north.jammuandkashmir.role);
      await reaction.message.guild.members.cache.get(user.id).roles.add(states.north.chandigarh.role);
      await reaction.message.guild.members.cache.get(user.id).roles.remove(states.north.role);
      await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.YesFamMember);
      await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.badgeSeparator);

      const emoji2 = reaction.message.reactions.cache.get(states.north.chandigarh.emoji);
      const emoji3 = reaction.message.reactions.cache.get(states.north.delhi.emoji);
      const emoji4 = reaction.message.reactions.cache.get(states.north.haryana.emoji);
      const emoji5 = reaction.message.reactions.cache.get(states.north.himachalPradesh.emoji);
      const emoji6 = reaction.message.reactions.cache.get(states.north.ladhak.emoji);
      const emoji7 = reaction.message.reactions.cache.get(states.north.punjab.emoji);
      const emoji8 = reaction.message.reactions.cache.get(states.north.rajasthan.emoji);

      emoji2.users.remove(user.id);
      emoji3.users.remove(user.id);
      emoji4.users.remove(user.id);
      emoji5.users.remove(user.id);
      emoji6.users.remove(user.id);
      emoji7.users.remove(user.id);
      emoji8.users.remove(user.id);

      return;
    };

    // punjab
    if(reaction.emoji.name === states.north.punjab.emoji){
      await reaction.message.guild.members.cache.get(user.id).roles.add(states.north.punjab.role);
      await reaction.message.guild.members.cache.get(user.id).roles.remove(states.north.role);
      await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.YesFamMember);
      await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.badgeSeparator);

      const emoji2 = reaction.message.reactions.cache.get(states.north.chandigarh.emoji);
      const emoji3 = reaction.message.reactions.cache.get(states.north.delhi.emoji);
      const emoji4 = reaction.message.reactions.cache.get(states.north.haryana.emoji);
      const emoji5 = reaction.message.reactions.cache.get(states.north.himachalPradesh.emoji);
      const emoji6 = reaction.message.reactions.cache.get(states.north.jammuandkashmir.emoji);
      const emoji7 = reaction.message.reactions.cache.get(states.north.ladhak.emoji);
      const emoji8 = reaction.message.reactions.cache.get(states.north.rajasthan.emoji);

      emoji2.users.remove(user.id);
      emoji3.users.remove(user.id);
      emoji4.users.remove(user.id);
      emoji5.users.remove(user.id);
      emoji6.users.remove(user.id);
      emoji7.users.remove(user.id);
      emoji8.users.remove(user.id);

      return;
    };

    // rejasthan
    if(reaction.emoji.name === states.north.rajasthan.emoji){
      await reaction.message.guild.members.cache.get(user.id).roles.add(states.north.rajasthan.role);
      await reaction.message.guild.members.cache.get(user.id).roles.add(states.north.chandigarh.role);
      await reaction.message.guild.members.cache.get(user.id).roles.remove(states.north.role);
      await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.YesFamMember);
      await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.badgeSeparator);

      const emoji2 = reaction.message.reactions.cache.get(states.north.chandigarh.emoji);
      const emoji3 = reaction.message.reactions.cache.get(states.north.delhi.emoji);
      const emoji4 = reaction.message.reactions.cache.get(states.north.haryana.emoji);
      const emoji5 = reaction.message.reactions.cache.get(states.north.himachalPradesh.emoji);
      const emoji6 = reaction.message.reactions.cache.get(states.north.jammuandkashmir.emoji);
      const emoji7 = reaction.message.reactions.cache.get(states.north.punjab.emoji);
      const emoji8 = reaction.message.reactions.cache.get(states.north.ladhak.emoji);

      emoji2.users.remove(user.id);
      emoji3.users.remove(user.id);
      emoji4.users.remove(user.id);
      emoji5.users.remove(user.id);
      emoji6.users.remove(user.id);
      emoji7.users.remove(user.id);
      emoji8.users.remove(user.id);

      return;
    };

  };

  // South Region
  if(reaction.message.channel == southRegion) {

    // Andra Pradesh
    if(reaction.emoji.name === states.south.andraPradesh.emoji) {
      await reaction.message.guild.members.cache.get(user.id).roles.add(states.south.andraPradesh.role)

      const emoji2 = reaction.message.reactions.cache.get(states.south.karnataka.emoji);
      const emoji3 = reaction.message.reactions.cache.get(states.south.kerala.emoji);
      const emoji4 = reaction.message.reactions.cache.get(states.south.puduchery.emoji);
      const emoji5 = reaction.message.reactions.cache.get(states.south.tamilNadu.emoji);
      const emoji6 = reaction.message.reactions.cache.get(states.south.telengana.emoji);

      emoji2.users.remove(user.id);
      emoji3.users.remove(user.id);
      emoji4.users.remove(user.id);
      emoji5.users.remove(user.id);
      emoji6.users.remove(user.id);

      return;
    };

    // karnataka
    if(reaction.emoji.name === states.south.karnataka.emoji) {
      await reaction.message.guild.members.cache.get(user.id).roles.add(states.south.karnataka.role)

      const emoji2 = reaction.message.reactions.cache.get(states.south.andraPradesh.emoji);
      const emoji3 = reaction.message.reactions.cache.get(states.south.kerala.emoji);
      const emoji4 = reaction.message.reactions.cache.get(states.south.puduchery.emoji);
      const emoji5 = reaction.message.reactions.cache.get(states.south.tamilNadu.emoji);
      const emoji6 = reaction.message.reactions.cache.get(states.south.telengana.emoji);

      emoji2.users.remove(user.id);
      emoji3.users.remove(user.id);
      emoji4.users.remove(user.id);
      emoji5.users.remove(user.id);
      emoji6.users.remove(user.id);

      return;
    };

    // kerala
    if(reaction.emoji.name === states.south.kerala.emoji) {
      await reaction.message.guild.members.cache.get(user.id).roles.add(states.south.kerala.role)

      const emoji2 = reaction.message.reactions.cache.get(states.south.karnataka.emoji);
      const emoji3 = reaction.message.reactions.cache.get(states.south.andraPradesh.emoji);
      const emoji4 = reaction.message.reactions.cache.get(states.south.puduchery.emoji);
      const emoji5 = reaction.message.reactions.cache.get(states.south.tamilNadu.emoji);
      const emoji6 = reaction.message.reactions.cache.get(states.south.telengana.emoji);

      emoji2.users.remove(user.id);
      emoji3.users.remove(user.id);
      emoji4.users.remove(user.id);
      emoji5.users.remove(user.id);
      emoji6.users.remove(user.id);

      return;
    };

    // puduchery
    if(reaction.emoji.name === states.south.puduchery.emoji) {
      await reaction.message.guild.members.cache.get(user.id).roles.add(states.south.puduchery.role)

      const emoji2 = reaction.message.reactions.cache.get(states.south.karnataka.emoji);
      const emoji3 = reaction.message.reactions.cache.get(states.south.kerala.emoji);
      const emoji4 = reaction.message.reactions.cache.get(states.south.andraPradesh.emoji);
      const emoji5 = reaction.message.reactions.cache.get(states.south.tamilNadu.emoji);
      const emoji6 = reaction.message.reactions.cache.get(states.south.telengana.emoji);

      emoji2.users.remove(user.id);
      emoji3.users.remove(user.id);
      emoji4.users.remove(user.id);
      emoji5.users.remove(user.id);
      emoji6.users.remove(user.id);

      return;
    };

    // Tamil Nadu
    if(reaction.emoji.name === states.south.tamilNadu.emoji) {
      await reaction.message.guild.members.cache.get(user.id).roles.add(states.south.tamilNadu.role)

      const emoji2 = reaction.message.reactions.cache.get(states.south.karnataka.emoji);
      const emoji3 = reaction.message.reactions.cache.get(states.south.kerala.emoji);
      const emoji4 = reaction.message.reactions.cache.get(states.south.andraPradesh.emoji);
      const emoji5 = reaction.message.reactions.cache.get(states.south.andraPradesh.emoji);
      const emoji6 = reaction.message.reactions.cache.get(states.south.telengana.emoji);

      emoji2.users.remove(user.id);
      emoji3.users.remove(user.id);
      emoji4.users.remove(user.id);
      emoji5.users.remove(user.id);
      emoji6.users.remove(user.id);

      return;
    };

    // telengana
    if(reaction.emoji.name === states.south.telengana.emoji) {
      await reaction.message.guild.members.cache.get(user.id).roles.add(states.south.telengana.role)

      const emoji2 = reaction.message.reactions.cache.get(states.south.karnataka.emoji);
      const emoji3 = reaction.message.reactions.cache.get(states.south.kerala.emoji);
      const emoji4 = reaction.message.reactions.cache.get(states.south.andraPradesh.emoji);
      const emoji5 = reaction.message.reactions.cache.get(states.south.tamilNadu.emoji);
      const emoji6 = reaction.message.reactions.cache.get(states.south.andraPradesh.emoji);

      emoji2.users.remove(user.id);
      emoji3.users.remove(user.id);
      emoji4.users.remove(user.id);
      emoji5.users.remove(user.id);
      emoji6.users.remove(user.id);

      return;
    };

    
  };
  
  });


bot.on('messageReactionRemove', async (reaction, user) =>{

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
      await reaction.message.guild.members.cache.get(user.id).roles.remove(states.test1.role)
      return;
    }
    if(reaction.emoji.name === '👎') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove(states.test2.role)
      return;
  }
};

if(reaction.message.channel == regionSelectChannel) {

  if(reaction.emoji.name === states.central.emoji) {
    await reaction.message.guild.members.cache.get(user.id).roles.remove(states.central.role)
    return;
  };
  if(reaction.emoji.name === states.north.emoji) {
    await reaction.message.guild.members.cache.get(user.id).roles.remove(states.north.role)
    return;
  }; 
  if(reaction.emoji.name === states.east.emoji) {
    await reaction.message.guild.members.cache.get(user.id).roles.remove(states.east.role)
    return;
  };  
  if(reaction.emoji.name === states.west.emoji) {
    await reaction.message.guild.members.cache.get(user.id).roles.remove(states.west.role)
    return;
  };  
  if(reaction.emoji.name === states.northeast.emoji) {
    await reaction.message.guild.members.cache.get(user.id).roles.remove(states.northeast.role)
    return;
  };  
  if(reaction.emoji.name === states.south.emoji) {
    await reaction.message.guild.members.cache.get(user.id).roles.remove(states.south.role)
    return;
  };  
  if(reaction.emoji.name === states.islands.emoji) {
    await reaction.message.guild.members.cache.get(user.id).roles.remove(states.islands.role)
    return;
  };
};

if(reaction.message.channel == northRegion) {

  if(reaction.emoji.name === states.north.chandigarh.emoji) {
    await reaction.message.guild.members.cache.get(user.id).roles.remove(states.north.chandigarh.role);
    return;
  };
  if(reaction.emoji.name === states.north.delhi.emoji) {
    await reaction.message.guild.members.cache.get(user.id).roles.remove(states.north.delhi.role);
    return;
  };
  if(reaction.emoji.name === states.north.haryana.emoji) {
    await reaction.message.guild.members.cache.get(user.id).roles.remove(states.north.haryana.role);
    return;
  };
  if(reaction.emoji.name === states.north.himachalPradesh.emoji) {
    await reaction.message.guild.members.cache.get(user.id).roles.remove(states.north.himachalPradesh.role);
    return;
  };
  if(reaction.emoji.name === states.north.jammuandkashmir.emoji) {
    await reaction.message.guild.members.cache.get(user.id).roles.remove(states.north.jammuandkashmir.role);
    return;
  };
  if(reaction.emoji.name === states.north.ladhak.emoji) {
    await reaction.message.guild.members.cache.get(user.id).roles.remove(states.north.ladhak.role);
    return;
  };
  if(reaction.emoji.name === states.north.punjab.emoji) {
    await reaction.message.guild.members.cache.get(user.id).roles.remove(states.north.punjab.role);
    return;
  };
  if(reaction.emoji.name === states.north.rajasthan.emoji) {
    await reaction.message.guild.members.cache.get(user.id).roles.remove(states.north.rajasthan.role);
    return;
  };

};

if(reaction.message.channel == southRegion) {

  if(reaction.emoji.name === states.south.andraPradesh.emoji) {
    await reaction.message.guild.members.cache.get(user.id).roles.remove(states.south.andraPradesh.role);
    return;
  };
  if(reaction.emoji.name === states.south.karnataka.emoji) {
    await reaction.message.guild.members.cache.get(user.id).roles.remove(states.south.karnataka.role);
    return;
  };
  if(reaction.emoji.name === states.south.kerala.emoji) {
    await reaction.message.guild.members.cache.get(user.id).roles.remove(states.south.kerala.role);
    return;
  };
  if(reaction.emoji.name === states.south.puduchery.emoji) {
    await reaction.message.guild.members.cache.get(user.id).roles.remove(states.south.puduchery.role);
    return;
  };
  if(reaction.emoji.name === states.south.tamilNadu.emoji) {
    await reaction.message.guild.members.cache.get(user.id).roles.remove(states.south.tamilNadu.role);
    return;
  };
  if(reaction.emoji.name === states.south.telengana.emoji) {
    await reaction.message.guild.members.cache.get(user.id).roles.remove(states.south.telengana.role);
    return;
  };
  
};
});


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
          message.react(states.north.punjab.emoji);
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