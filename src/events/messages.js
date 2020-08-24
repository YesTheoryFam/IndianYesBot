// const states = require('../collections/Roles/stateTags.json');

module.exports = bot => {
    bot.on('message', message =>{
        const betaTestChannel = message.guild.channels.cache.get('746755589895487488');
        const pollsChannel = message.guild.channels.cache.get('720682985581707325');
        const featureRequestChannel = message.guild.channels.cache.get('715200556817317940');
        
            if (message.author.bot) return;
        
             // Beta Test Channel
            // ==========================================
        
           if(message.channel == betaTestChannel){
        
            // reply for hi
            if (message.content.includes('hi')) {

                if (message.member.hasPermission('KICK_MEMBERS')){
                    message.channel.send(`Hi there, ${message.author}`);
            
                };
            } else {
                // message.channel.send(`I'm currently under development. But you can always tell me hi and I'll say hi back. See, I'm a nice bot.`)
                return;
            };
        
            
        
           };
        
        //    ============================================


        //    Reaction for F 
        if (message.content.toLowerCase() === 'F'.toLocaleLowerCase()) {
            message.react('🇫');
            };
            if (message.content.startsWith('F ')) (
                message.react('🇫')
            );
            if (message.content.startsWith('f ')) (
                message.react('🇫')
            );

        //      Reaction of F ends here ----------------
        
      // Reaction in #polls
        if (message.channel == pollsChannel){
          message.react('🇦').then(() => message.react('🅱️'));
        };
      
        // Reaction in #feature-request
        if (message.channel == featureRequestChannel){
          message.react('👍').then(() => message.react('👎'));
        };

})};