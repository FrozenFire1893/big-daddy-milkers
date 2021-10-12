//require the necessary discord.js classes
const {Client, Intents} = require("discord.js");
const {token} = require('./config.json');

//create new client instance
const client = new Client({intents: [Intents.FLAGS.GUILDS]});

//when the client is ready, run this only once
client.once('ready', () => {
    console.log("I'm ready to be milked, kitten ;)");
});

//log into discord with your token
client.login(token);