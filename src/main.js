const dotenv = require('dotenv').config({path: '../.env'});
const fs = require('fs');
const Discord = require('discord.js');

const client = new Discord.Client();

// storea det här i en mongo databas sen eller en config fil kanske som vi på servern kan ändra
// eller ha det straight up statiskt
const prefix = '&';
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
client.commands = new Discord.Collection();

// Kolla ifall det blivit en uppdatering i regler filen och skriv det kanalen

for (const file of commandFiles)
{
    const command = require(`./commands/${file}`)
    client.commands.set(command.name, command)
}

client.once('ready', () => {
    console.log("READY");
    client.user.setPresence({activity: { name: '🎉blip bop🎉' }, status: 'away'}).catch(console.error);
})


client.on('message', message => {
    // Används så boten bara svara på meddelanden i huvudservern (Byt senare nu är det IDt för area 51)
    if (message.channel.type != 'dm') {
        if (message.guild.id != '583235725948878858') return;
    }

    if (!message.content.startsWith(prefix) || message.author.bot) return; // Boten ska bara svara ifall det innehåller ett prefix; Boten ska inte heller svara på sig själv

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const content = args.shift().toLowerCase();

    // Kommandon
    if (content == "info")
        client.commands.get('info').execute(message);
    
})

client.login(process.env.DISCORD_TOKEN);