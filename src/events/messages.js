module.exports = bot => {
    bot.on('message', message =>{
        const betaTestChannel = message.guild.channels.cache.get('746755589895487488');
        
            if (message.author.bot) return;
        
        
        
             // Beta Test Channel
            // ==========================================
        
           if(message.channel == betaTestChannel){
        
        
            if (message.content.includes('hi')) {
                if (message.member.hasPermission('KICK_MEMBERS')){
                    message.channel.send(`Hi there, ${message.author}`);
            
                };
            } else {
                message.channel.send(`I'm currently under development. But you can always tell me hi and I'll say hi back. See, I'm a nice bot.`)
            };
        
        
           };
        
        //    ============================================
        
        

})};