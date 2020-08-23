const Discord = require('discord.js');

module.exports = bot => {
    //Message update logging
bot.on("messageUpdate", async(oldMessage, newMessage) =>{
    if (oldMessage.author.bot) return;
    if (oldMessage.content === newMessage.content){
      return;
    }
      let logembed = new Discord.MessageEmbed()
      .setThumbnail(oldMessage.author.avatarURL())
      .setAuthor("Message Edited")
      .setColor("#FFFF00")
      .setDescription("<@"+oldMessage.author.id+">")
      .addField("Channel", "<#"+newMessage.channel.id+">", true)
      .addField("Before", oldMessage.content, true)
      .addField("After", newMessage.content, true)
      .addField("Sent at", oldMessage.createdAt.toLocaleString("en-IN", {timeZone: "Asia/Kolkata"}) + " (IST)", true)
      .addField("Message Link", "https://discordapp.com/channels/711634547770654791/"+newMessage.channel.id+"/"+newMessage.id)
      .setTimestamp();
  
      let loggingChannel = newMessage.guild.channels.cache.get('746907185623072869')
        if(!loggingChannel) return;
  
        loggingChannel.send(logembed);
  });
  //Deleted messages logging
  bot.on("messageDelete", async(Message) =>{
    if (Message.author.bot) return;
  
      let logDelembed = new Discord.MessageEmbed()
      .setThumbnail(Message.author.avatarURL())
      .setAuthor("Message Deleted")
      .setColor("#FF0000")
      .setDescription("<@"+Message.author.id+">")
      .addField("Channel", "<#"+Message.channel.id+">", true)
      .addField("Message", Message.content || 'image', true)
      .setTimestamp();
  
      let loggingDelChannel = Message.guild.channels.cache.get('746907185623072869')
        if(!loggingDelChannel) return;
  
        loggingDelChannel.send(logDelembed);
  });
}
