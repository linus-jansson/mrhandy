const Discord = require('discord.js');
// Link to limpan.dev
// link to the server

const embed = new Discord.MessageEmbed()
    .setColor('#66ff75')
    .setDescription("blip blop")
    .addFields(
        // { name: '\u200B', value: '\u200B' },
        { name: 'Dev website', value: 'https://limpan.dev/', inline: true },
        { name: 'Bot repo', value: 'https://github.com/linus-jansson/mrhandy/', inline: true },
        { name: 'Inline field title', value: 'Some value here', inline: true },
    )
    .setTimestamp()
    .setFooter("\/\/mr handy", 'https://limpan.dev/mrhandy');


module.exports = {
    name: "info",
    execute(message) {
        message.channel.send(embed)
    }
}