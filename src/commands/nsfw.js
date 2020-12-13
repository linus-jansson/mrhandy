const Discord = require('discord.js');
const fetch = require('node-fetch')

let subreddit = "nsfw"

// for all my horny amigos
module.exports = {
    name: "nsfw",
    execute(message) {
 
        if (!message.channel.nsfw)
            return message.channel.send("Try sending this in a NSFW channel..")

        fetch(`https://www.reddit.com/r/${subreddit}.json?sort=top&t=week&limit=100`, {method: 'GET'})
        .then(res => res.json())
        .then(json => {
            // TODO: CHECK IF POST IS VIDEO; OTHERWISE IT WILL CRASH
            const posts = json.data.children.filter(post => post.data.over_18)
            
            if (!posts.length) 
                return message.channel.send('It seems we are out of fresh memes!, Try again later.');
            
            const randomnumber = Math.floor(Math.random() * posts.length)
            const post = posts[randomnumber]
            
            const embed = new Discord.MessageEmbed()
                .setColor(0x00A2E8)
                .setTitle(post.data.title)
                .setImage(post.data.url)
                // .addField("Other info:", "Up votes: " + post.data.ups + " / Comments: " + post.data.num_comments)
                .setFooter(`By u/${post.data.author} on r/nsfw`)
        
                message.channel.send(embed)
        })
        .catch(err => {
            message.channel.send("Something went wrong")
            console.log(err);
        })
    }
}