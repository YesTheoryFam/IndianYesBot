const Chance = require('chance');
const chanceObj = new Chance();

const states = require('../collections/Roles/stateTags.json');
const serverRoles = require('../collections/Roles/Roles.json');



module.exports = bot => {
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
        const welcomeChat = reaction.message.guild.channels.cache.get('721050178794291292');

        const welcomMessage = chanceObj.pickone([`
        A wild ${user} appeared.`,
       `${user} joined the party.`,
       `${user} just landed.`,
       `${user} just *sliiid* into the server.`,
       `${user} is here.`,
       `Welcome, ${user}. We hope you brought pizza 🍕.`,
       `${user} just showed up!`,
       `Everyone welcome ${user}`,
       `Good to see you, ${user}`
     ]);
        
          if(reaction.message.partial) await reaction.message.fetch();
          if (reaction.partial) await reaction.fetch();
          if(user.bot) return;
      
            // Test Code
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
            await reaction.message.guild.members.cache.get(user.id).roles.remove(serverRoles.beta1)
            northRegion.send(`Great! Now select your state, ${user}.`).then(m => m.delete());
      
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
            await reaction.message.guild.members.cache.get(user.id).roles.remove(serverRoles.beta1)
            centralRegion.send(`Great! Now select your state, ${user}.`).then(m => m.delete());
      
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
            await reaction.message.guild.members.cache.get(user.id).roles.remove(serverRoles.beta1)
            eastRegion.send(`Great! Now select your state, ${user}.`).then(m => m.delete());
      
      
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
            await reaction.message.guild.members.cache.get(user.id).roles.remove(serverRoles.beta1)
            westRegion.send(`Great! Now select your state, ${user}.`).then(m => m.delete());
      
      
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
            await reaction.message.guild.members.cache.get(user.id).roles.remove(serverRoles.beta1)
            southRegion.send(`Great! Now select your state, ${user}.`).then(m => m.delete());
      
      
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
            await reaction.message.guild.members.cache.get(user.id).roles.remove(serverRoles.beta1)
            islandRegion.send(`Great! Now select your state, ${user}.`).then(m => m.delete());
      
      
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
            await reaction.message.guild.members.cache.get(user.id).roles.remove(serverRoles.beta1)
            northeastRegion.send(`Great! Now select your state, ${user}.`).then(m => m.delete());
      
      
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
            await reaction.message.guild.members.cache.get(user.id).roles.remove(states.north.role);
            await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.YesFamMember);
            await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.badgeSeparator);

            welcomeChat.send(welcomMessage);
      
      
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
      
            welcomeChat.send(welcomMessage);

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
            await reaction.message.guild.members.cache.get(user.id).roles.remove(states.north.role);
            await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.YesFamMember);
            await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.badgeSeparator);
      
            welcomeChat.send(welcomMessage);

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
            await reaction.message.guild.members.cache.get(user.id).roles.remove(states.north.role);
            await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.YesFamMember);
            await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.badgeSeparator);
      
            welcomeChat.send(welcomMessage);

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
            await reaction.message.guild.members.cache.get(user.id).roles.remove(states.north.role);
            await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.YesFamMember);
            await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.badgeSeparator);
      
            welcomeChat.send(welcomMessage);

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
            await reaction.message.guild.members.cache.get(user.id).roles.remove(states.north.role);
            await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.YesFamMember);
            await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.badgeSeparator);
     
            welcomeChat.send(welcomMessage);
 
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
  
            welcomeChat.send(welcomMessage);
    
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
            await reaction.message.guild.members.cache.get(user.id).roles.remove(states.north.role);
            await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.YesFamMember);
            await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.badgeSeparator);
 
            welcomeChat.send(welcomMessage);
     
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
            await reaction.message.guild.members.cache.get(user.id).roles.add(states.south.andraPradesh.role);
            await reaction.message.guild.members.cache.get(user.id).roles.remove(states.south.role);
            await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.YesFamMember);
            await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.badgeSeparator);
      
            welcomeChat.send(welcomMessage);

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
            await reaction.message.guild.members.cache.get(user.id).roles.add(states.south.karnataka.role);
            await reaction.message.guild.members.cache.get(user.id).roles.remove(states.south.role);
            await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.YesFamMember);
            await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.badgeSeparator);

            welcomeChat.send(welcomMessage);

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
            await reaction.message.guild.members.cache.get(user.id).roles.add(states.south.kerala.role);
            await reaction.message.guild.members.cache.get(user.id).roles.remove(states.south.role);
            await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.YesFamMember);
            await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.badgeSeparator);
   
            welcomeChat.send(welcomMessage);
   
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
            await reaction.message.guild.members.cache.get(user.id).roles.add(states.south.puduchery.role);
            await reaction.message.guild.members.cache.get(user.id).roles.remove(states.south.role);
            await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.YesFamMember);
            await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.badgeSeparator);
     
            welcomeChat.send(welcomMessage);
 
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
            await reaction.message.guild.members.cache.get(user.id).roles.add(states.south.tamilNadu.role);
            await reaction.message.guild.members.cache.get(user.id).roles.remove(states.south.role);
            await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.YesFamMember);
            await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.badgeSeparator);
    
            welcomeChat.send(welcomMessage);
  
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
            await reaction.message.guild.members.cache.get(user.id).roles.add(states.south.telengana.role);
            await reaction.message.guild.members.cache.get(user.id).roles.remove(states.south.role);
            await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.YesFamMember);
            await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.badgeSeparator);

            welcomeChat.send(welcomMessage);
      
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
      
        // Northeast Region
        if(reaction.message.channel == northeastRegion) {
          if (reaction.emoji.name === states.northeast.arunachalPradesh.emoji) {
            await reaction.message.guild.members.cache.get(user.id).roles.add(states.northeast.arunachalPradesh.role);
            await reaction.message.guild.members.cache.get(user.id).roles.remove(states.northeast.role);
            await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.YesFamMember);
            await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.badgeSeparator);
      
            welcomeChat.send(welcomMessage);

            return;
          };
          if (reaction.emoji.name === states.northeast.assam.emoji) {
            await reaction.message.guild.members.cache.get(user.id).roles.add(states.northeast.assam.role);
            await reaction.message.guild.members.cache.get(user.id).roles.remove(states.northeast.role);
            await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.YesFamMember);
            await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.badgeSeparator);
  
            welcomeChat.send(welcomMessage);
    
            return;
          };
          if (reaction.emoji.name === states.northeast.manipur.emoji) {
            await reaction.message.guild.members.cache.get(user.id).roles.add(states.northeast.manipur.role);
            await reaction.message.guild.members.cache.get(user.id).roles.remove(states.northeast.role);
            await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.YesFamMember);
            await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.badgeSeparator);
  
            welcomeChat.send(welcomMessage);
    
            return;
          };
          if (reaction.emoji.name === states.northeast.meghalaya.emoji) {
            await reaction.message.guild.members.cache.get(user.id).roles.add(states.northeast.meghalaya.role);
            await reaction.message.guild.members.cache.get(user.id).roles.remove(states.northeast.role);
            await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.YesFamMember);
            await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.badgeSeparator);
  
            welcomeChat.send(welcomMessage);
    
            return;
          };
          if (reaction.emoji.name === states.northeast.sikkim.emoji) {
            await reaction.message.guild.members.cache.get(user.id).roles.add(states.northeast.sikkim.role);
            await reaction.message.guild.members.cache.get(user.id).roles.remove(states.northeast.role);
            await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.YesFamMember);
            await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.badgeSeparator);
   
            welcomeChat.send(welcomMessage);
   
            return;
          };
          if (reaction.emoji.name === states.northeast.tripura.emoji) {
            await reaction.message.guild.members.cache.get(user.id).roles.add(states.northeast.tripura.role);
            await reaction.message.guild.members.cache.get(user.id).roles.remove(states.northeast.role);
            await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.YesFamMember);
            await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.badgeSeparator);
    
            welcomeChat.send(welcomMessage);
  
            return;
          };
        };
        
        // Central Region
        if(reaction.message.channel == centralRegion) {
          if (reaction.emoji.name === states.central.chhattisgarh.emoji) {
            await reaction.message.guild.members.cache.get(user.id).roles.add(states.central.chhattisgarh.role);
            await reaction.message.guild.members.cache.get(user.id).roles.remove(states.central.role);
            await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.YesFamMember);
            await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.badgeSeparator);
      
            welcomeChat.send(welcomMessage);

            return;
          };
          if (reaction.emoji.name === states.central.madhyaPradesh.emoji) {
            await reaction.message.guild.members.cache.get(user.id).roles.add(states.central.madhyaPradesh.role);
            await reaction.message.guild.members.cache.get(user.id).roles.remove(states.central.role);
            await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.YesFamMember);
            await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.badgeSeparator);
 
            welcomeChat.send(welcomMessage);
     
            return;
          };
          if (reaction.emoji.name === states.central.uttarPradesh.emoji) {
            await reaction.message.guild.members.cache.get(user.id).roles.add(states.central.uttarPradesh.role);
            await reaction.message.guild.members.cache.get(user.id).roles.remove(states.central.role);
            await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.YesFamMember);
            await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.badgeSeparator);
     
            welcomeChat.send(welcomMessage);
 
            return;
          };
          if (reaction.emoji.name === states.central.uttarakhand.emoji) {
            await reaction.message.guild.members.cache.get(user.id).roles.add(states.central.uttarakhand.role);
            await reaction.message.guild.members.cache.get(user.id).roles.remove(states.central.role);
            await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.YesFamMember);
            await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.badgeSeparator);
  
            welcomeChat.send(welcomMessage);
    
            return;
          };
        };
      
        // East Region
        if(reaction.message.channel == eastRegion) {
          if (reaction.emoji.name === states.east.bihar.emoji) {
            await reaction.message.guild.members.cache.get(user.id).roles.add(states.east.bihar.role);
            await reaction.message.guild.members.cache.get(user.id).roles.remove(states.east.role);
            await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.YesFamMember);
            await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.badgeSeparator);
   
            welcomeChat.send(welcomMessage);
   
            return;
          };
          if (reaction.emoji.name === states.east.jharkhand.emoji) {
            await reaction.message.guild.members.cache.get(user.id).roles.add(states.east.jharkhand.role);
            await reaction.message.guild.members.cache.get(user.id).roles.remove(states.east.role);
            await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.YesFamMember);
            await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.badgeSeparator);
   
            welcomeChat.send(welcomMessage);
   
            return;
          };
          if (reaction.emoji.name === states.east.odisha.emoji) {
            await reaction.message.guild.members.cache.get(user.id).roles.add(states.east.jharkhand.role);
            await reaction.message.guild.members.cache.get(user.id).roles.remove(states.east.role);
            await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.YesFamMember);
            await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.badgeSeparator);
  
            welcomeChat.send(welcomMessage);
    
            return;
          };
          if (reaction.emoji.name === states.east.westBengal.emoji) {
            await reaction.message.guild.members.cache.get(user.id).roles.add(states.east.westBengal.role);
            await reaction.message.guild.members.cache.get(user.id).roles.remove(states.east.role);
            await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.YesFamMember);
            await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.badgeSeparator);
   
            welcomeChat.send(welcomMessage);
   
            return;
          };
        };
      
        // West Region
        if(reaction.message.channel == westRegion) {
          if (reaction.emoji.name === states.west.DNH_DnD.emoji) {
            await reaction.message.guild.members.cache.get(user.id).roles.add(states.west.DNH_DnD.role);
            await reaction.message.guild.members.cache.get(user.id).roles.remove(states.west.role);
            await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.YesFamMember);
            await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.badgeSeparator);
    
            welcomeChat.send(welcomMessage);
  
            return;
          };
          if (reaction.emoji.name === states.west.goa.emoji) {
            await reaction.message.guild.members.cache.get(user.id).roles.add(states.west.goa.role);
            await reaction.message.guild.members.cache.get(user.id).roles.remove(states.west.role);
            await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.YesFamMember);
            await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.badgeSeparator);
     
            welcomeChat.send(welcomMessage);
 
            return;
          };
          if (reaction.emoji.name === states.west.gujarat.emoji) {
            await reaction.message.guild.members.cache.get(user.id).roles.add(states.west.gujarat.role);
            await reaction.message.guild.members.cache.get(user.id).roles.remove(states.west.role);
            await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.YesFamMember);
            await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.badgeSeparator);
     
            welcomeChat.send(welcomMessage);
 
            return;
          };
          if (reaction.emoji.name === states.west.maharashtra.emoji) {
            await reaction.message.guild.members.cache.get(user.id).roles.add(states.west.maharashtra.role);
            await reaction.message.guild.members.cache.get(user.id).roles.remove(states.west.role);
            await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.YesFamMember);
            await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.badgeSeparator);
     
            welcomeChat.send(welcomMessage);
 
            return;
          };
        };
      
        // Island Region
        if(reaction.message.channel == islandRegion) {
          if (reaction.emoji.name === states.islands.andamanNicobar.emoji) {
            await reaction.message.guild.members.cache.get(user.id).roles.add(states.islands.andamanNicobar.role);
            await reaction.message.guild.members.cache.get(user.id).roles.remove(states.islands.role);
            await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.YesFamMember);
            await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.badgeSeparator);
      
            welcomeChat.send(welcomMessage);

            return;
          };
          if (reaction.emoji.name === states.islands.lakshadweep.emoji) {
            await reaction.message.guild.members.cache.get(user.id).roles.add(states.islands.lakshadweep.role);
            await reaction.message.guild.members.cache.get(user.id).roles.remove(states.islands.role);
            await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.YesFamMember);
            await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.badgeSeparator);
   
            welcomeChat.send(welcomMessage);
   
            return;
          };
        };
        
        });
}