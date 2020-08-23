// const Discord = require('discord.js');
// const bot = new Discord.Client({partials: ["MESSAGE", "REACTION", "CHANNEL"]});

// const states = require('../collections/Roles/stateTags.json')
const PREFIX = "!";


module.exports = bot => {

    bot.on('message', message => {
    if(message.author.bot) return;


    const betaTestChannel = message.guild.channels.cache.get('746755589895487488');
    const archiveCategory = '747111680168820766';

        
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
            };
              break;

            
            case 'archive':

                if (message.member.hasPermission('ADMINISTRATOR')){

                    message.channel.setParent(archiveCategory);
                    message.channel.lockPermissions(archiveCategory);
                    message.react('👍');
                    message.channel.setPosition(0);
                    // serverLogs.send(`${message.author} has archived ${message.channel}`);

            };

            break;

          };
        })

};