// const Discord = require('discord.js');
// const bot = new Discord.Client({partials: ["MESSAGE", "REACTION", "CHANNEL"]});

const states = require('../collections/Roles/stateTags.json')


module.exports = betabot => {

    betabot.on('message', message => {

        const PREFIX = '!';
        
        const betaTestChannel = message.guild.channels.cache.get('746755589895487488');
        
        
          let args = message.content.substring(PREFIX.length).split(" ");
          switch(args[0]) {
        
            case 'ping':
            if (message.channel == betaTestChannel) {
              message.channel.send('calculating ping ...').then(resultMessage => {
                const pong = resultMessage.createdTimestamp - message.createdTimestamp;
              
                resultMessage.delete();
                message.channel.send("```Latency = " + pong + "ms``````API Latency = " + bot.ws.ping + "ms```");
              })
            } else {
              if (message.member.hasPermission('ADMINISTRATOR')){
                message.channel.send('calculating ping ...').then(resultMessage => {
                  const pong = resultMessage.createdTimestamp - message.createdTimestamp;
                
                  resultMessage.delete();
                  message.channel.send("```Latency = " + pong + "ms``````API Latency = " + bot.ws.ping + "ms```").then(pongMessage => {
                    pongMessage.delete({timeout: 5000});
                    message.delete({timeout: 5000});
                    return;
                  })
                })
              } else {
                return;
              }
            }
              break;
        
            case 'react':
                const reactContent = message.content.replace('!react ', "")
          const fetchedMessage = message.fetch(reactContent);
            console.log(fetchedMessage)
        //   fetchedMessage.react(states.test1.emote);1

              break;
          };
        })

};