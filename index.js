const { Client, Events, GatewayIntentBits, Partials } = require('discord.js')
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

client.on('messageCreate', message => {
    if (message.content === 'hello') {
        axios.get('https://pirate.monkeyness.com/api/translate?english=' + message.content)
        .then(response => {
            message.reply(response.data);
          })
          .catch(error => {
            console.log(error);
          });
    }
})

client.on(Events.MessageReactionAdd, async (reaction, user) => {
    if (reaction.partial) {
        try {
            await reaction.fetch();
        } catch (error) {
            console.error('Something went wrong when fetching the message:', error);
            return;
        }
    }
    console.log(reaction.emoji)
    if (reaction.emoji.name === "🏴‍☠️") {
        axios.get('https://pirate.monkeyness.com/api/translate?english=' + reaction.message.content)
        .then(response => {
            reaction.message.reply(">>> " + response.data);
            })
            .catch(error => {
            console.log(error);
            });
    }
});

client.login(process.env.TOKEN)