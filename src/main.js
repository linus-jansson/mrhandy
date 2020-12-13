const dotenv = require('dotenv').config({path: '../.env'});

const Discord = require('discord.js');
const client = new Discord.Client();

const infoEmbed = new Discord.MessageEmbed()
    .setColor('#66ff75')
    .setDescription("blip blop")
    .addFields(
        { name: '\u200B', value: '\u200B' },
		{ name: 'Dev website', value: 'https://limpan.dev/', inline: true },
		{ name: 'Bot repo', value: 'https://github.com/linus-jansson/mrhandy/', inline: true },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
    )
    .setTimestamp()
    .setFooter("Hello World");
    

client.on('ready', () => {
    console.log("READY");
    client.user.setPresence({activity: { name: '🎉blip bop🎉' }, status: 'away'}).catch(console.error);
})


client.on('message', msg => {
    
    if (msg.author.bot) return;

    if (msg.content == "hello")
        msg.channel.send("hello")

    if (msg.content == "info")
        msg.channel.send(infoEmbed)
})
client.login(process.env.DISCORD_TOKEN)