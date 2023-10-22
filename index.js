const { Client, Events, GatewayIntentBits, Partials, EmbedBuilder } = require('discord.js')
require('dotenv/config')

const axios = require('axios')

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions,
    ],
    partials: [
        Partials.Message,
        Partials.Channel,
        Partials.Reaction,
    ],
})

client.on('ready', () => {
    console.log('The bot is ready')
})

// client.on('messageCreate', message => {
//     if (message.content === 'hello') {
//         axios.get('https://pirate.monkeyness.com/api/translate?english=' + message.content)
//         .then(response => {
//             message.reply(response.data);
//           })
//           .catch(error => {
//             console.log(error);
//           });
//     }
// })

client.on(Events.MessageReactionAdd, async (reaction, user) => {
    if (reaction.partial) {
        try {
            await reaction.fetch();
        } catch (error) {
            console.error('Something went wrong when fetching the message:', error);
            return;
        }
    }
    const embed = new EmbedBuilder()
    let author = reaction.message.author
    let url = 'https://discord.com/channels/' + reaction.message.guildId + '/' + reaction.message.channelId + '/' + reaction.message.id
    embed.setAuthor({ name: author.globalName, iconURL: author.displayAvatarURL(), url: url })
    try {
        embed.setColor(reaction.message.member.displayHexColor);
    } catch (error) {
        console.error("Something went wrong ", error);
        return;
    }

    // console.log(reaction.emoji)
    // console.log(reaction.message.content)
    // let messageArr = reaction.message.content.split(":")
    let message = encodeURI(reaction.message.content)
    // console.log(message)

    // pirate translator
    if (reaction.emoji.name === "🏴‍☠️") {
        axios.get('https://pirate.monkeyness.com/api/translate?english=' + message)
        .then(response => {
            embed.setDescription(response.data)
            embed.setFooter({ text: 'Pirate translation 🏴‍☠️ requested by ' + user.globalName})
            reaction.message.reply({ embeds: [embed] })
            })
            .catch(error => {
            console.log(error);
            });
    }
    // redneck translator
    if (reaction.emoji.name === "🤠") {
        axios.get('https://api.funtranslations.com/translate/redneck.json?text=' + message)
        .then(response => {
            embed.setDescription(response.data.contents.translated)
            embed.setFooter({ text: 'Redneck translation 🤠 requested by ' + user.globalName})
            reaction.message.reply({ embeds: [embed] })
            })
            .catch(error => {
            console.log(error);
            });
    }
    // article rewrite translator
    if (reaction.emoji.name === "✍️") {
        axios.get('https://api.funtranslations.com/translate/article_rewrite.json?text=' + message)
        .then(response => {
            embed.setDescription(response.data.contents.translated)
            embed.setFooter({ text: 'Message rewrite ✍️ requested by ' + user.globalName})
            reaction.message.reply({ embeds: [embed] })
            })
            .catch(error => {
            console.log(error);
            });
    }
    // pig latin tranlsator
    if (reaction.emoji.name === "🐷") {
        axios.get('https://api.funtranslations.com/translate/pig-latin.json?text=' + message)
        .then(response => {
            embed.setDescription(response.data.contents.translated)
            embed.setFooter({ text: 'Pig latin translation 🐷 requested by ' + user.globalName})
            reaction.message.reply({ embeds: [embed] })
            })
            .catch(error => {
            console.log(error);
            });
    }
    // valley girl translator
    if (reaction.emoji.name === "💅") {
        axios.get('https://api.funtranslations.com/translate/valspeak.json?text=' + message)
        .then(response => {
            embed.setDescription(response.data.contents.translated)
            embed.setFooter({ text: 'Valley girl translation 💅 requested by ' + user.globalName})
            reaction.message.reply({ embeds: [embed] })
            })
            .catch(error => {
            console.log(error);
            });
    }
    // old english translator
    if (reaction.emoji.name === "📜") {
        axios.get('https://api.funtranslations.com/translate/oldenglish.json?text=' + message)
        .then(response => {
            embed.setDescription(response.data.contents.translated)
            embed.setFooter({ text: 'Old English translation 📜 requested by ' + user.globalName})
            reaction.message.reply({ embeds: [embed] })
            })
            .catch(error => {
            console.log(error);
            });
    }
    // shakespeare translator
    if (reaction.emoji.name === "📖") {
        axios.get('https://api.funtranslations.com/translate/shakespeare.json?text=' + message)
        .then(response => {
            embed.setDescription(response.data.contents.translated)
            embed.setFooter({ text: 'Shakespeare translation 📖 requested by ' + user.globalName})
            reaction.message.reply({ embeds: [embed] })
            })
            .catch(error => {
            console.log(error);
            });
    }
    // new york translator
    if (reaction.emoji.name === "🗽") {
        axios.get('https://api.funtranslations.com/translate/brooklyn.json?text=' + message)
        .then(response => {
            embed.setDescription(response.data.contents.translated)
            embed.setFooter({ text: 'New York translation 🗽 requested by ' + user.globalName})
            reaction.message.reply({ embeds: [embed] })
            })
            .catch(error => {
            console.log(error);
            });
    }
});

// client.on(Events.MessageReactionAdd, async (reaction, user) => {
//     if (reaction.partial) {
//         try {
//             await reaction.fetch();
//         } catch (error) {
//             console.error('Something went wrong when fetching the message:', error);
//             return;
//         }
//     }
//     console.log(reaction.emoji)
//     if (reaction.emoji.name === "🇨🇦") {
//         let messageArr = reaction.message.content.split("#")
//         messageArr.forEach((item, idx, arr) => {
//             axios.get('https://pirate.monkeyness.com/api/translate?english=' + item)
//             .then(response => {
//                 arr[idx] = response.data
//                 console.log(response.data)
//                 console.log(messageArr)
//                 })
//                 .catch(error => {
//                 console.log(error);
//                 });
//         })
//         // console.log(messageArr)
//         // let output = messageArr.join('#')
//         // reaction.message.reply(">>> " + output)
//     }
// });

client.login(process.env.TOKEN)