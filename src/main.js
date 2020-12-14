const dotenv = require('dotenv').config({path: '../.env'});
const fs = require('fs');
const Discord = require('discord.js');

const client = new Discord.Client();

// storea det här i en mongo databas sen eller en config fil kanske som vi på servern kan ändra
// eller ha det straight up statiskt
const prefix = '&';
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

client.commands = new Discord.Collection();

// TODO: Kolla ifall det blivit en uppdatering i regler filen och skriv det kanalen
// TODO: En bra log funktion som loggar errors och andra log grejer, sno från limpanweb sen när det är klart
// TODO: När en ny användare joinar servern så ska de få rollen "comrade" 
// alternativt att man får det efter man varit aktiv / varit medlem på servern en viss tid

// command handler
for (const file of commandFiles)
{
    const command = require(`./commands/${file}`)
    client.commands.set(command.name, command)
}

client.once('ready', () => {
    console.log("READY");
    client.user.setPresence({activity: { name: 'blip bop👨‍💻🎉', type: "LISTENING" }, status: 'idle'}).catch(console.error);
})

client.on('message', message => {
    // Används så boten bara svara på meddelanden i huvudservern (Byt senare nu är det IDt för area 51)
    if (message.channel.type != 'dm') {
        if (message.guild.id != '583235725948878858') return;
    }
    
    // Boten ska bara svara ifall det innehåller ett prefix; Boten ska inte heller svara på sig själv
    if (!message.content.startsWith(prefix) || message.author.bot) return; 

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const content = args.shift().toLowerCase();

    // Kommandon
    if (content == "info") // Info about the server and the bot
        client.commands.get('info').execute(message);
    else if (content == "nsfw") // NSFW command
        client.commands.get('nsfw').execute(message);
    
})

client.login(process.env.DISCORD_TOKEN);