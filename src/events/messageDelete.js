const Discord = require('discord.js');

module.exports = bot => {
    //Deleted messages logging
    bot.on("messageDelete", async (message) => {
        // if (message.author.bot) return;

        let logDelembed = new Discord.MessageEmbed()
            .setThumbnail(message.author.avatarURL())
            .setAuthor("Message Deleted")
            .setColor("#FF0000")
            .setDescription("<@" + message.author.id + ">")
            .addField("Channel", "<#" + message.channel.id + ">", true)
            .addField("Message", message.content || 'image', true)
            .setTimestamp();

        let loggingDelChannel = message.guild.channels.cache.get('746907185623072869')
        if (!loggingDelChannel) return;

        loggingDelChannel.send(logDelembed);
    });
}
