const states = require('../collections/Roles/stateTags.json');

module.exports = bot => {
    bot.on('message', message =>{
        const betaTestChannel = message.guild.channels.cache.get('746755589895487488');
        
            if (message.author.bot) return;
        
             // Beta Test Channel
            // ==========================================
        
           if(message.channel == betaTestChannel){
        
            // reply for hi
            if (message.content.includes('hi')) {
                if (message.member.hasPermission('KICK_MEMBERS')){
                    message.channel.send(`Hi there, ${message.author}`);
            
                };
            } else if (message.content.startsWith('country')){{
                    message.react(states.test1.emote);
                    message.react(states.test2.emote);
                }
            } else {
                message.channel.send(`I'm currently under development. But you can always tell me hi and I'll say hi back. See, I'm a nice bot.`)
            };
        
            
        
           };
        
        //    ============================================
        
        

})};