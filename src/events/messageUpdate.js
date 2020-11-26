const Discord = require('discord.js');

module.exports = bot => {
    //Message update logging
    bot.on("messageUpdate", async (oldMessage, newMessage) => {
        // if (oldMessage.author.bot) return;
        if (oldMessage.content === newMessage.content) {
            return;
        }
        let logembed = new Discord.MessageEmbed()
            .setThumbnail(oldMessage.author.avatarURL())
            .setAuthor("Message Edited")
            .setColor("#FFFF00")
            .setDescription("<@" + oldMessage.author.id + ">")
            .addField("Channel", "<#" + newMessage.channel.id + ">", true)
            .addField("Before", oldMessage.content, true)
            .addField("After", newMessage.content, true)
            .addField("Sent at", oldMessage.createdAt.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) + " (IST)", true)
            .addField("Message Link", "https://discordapp.com/channels/711634547770654791/" + newMessage.channel.id + "/" + newMessage.id)
            .setTimestamp();

        let loggingChannel = newMessage.guild.channels.cache.get('746907185623072869')
        if (!loggingChannel) return;

        loggingChannel.send(logembed);
    });
}