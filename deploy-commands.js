const fs = require("fs");
const {SlashCommandBuilder} = require('@discordjs/builders');
const {REST} = require('@discordjs/rest');
const {Routes} = require('discord-api-types/v9');
const {botClientId, guildId, token} = require('./config.json');

//registering command listener? idk i think thats right terminology
const commands = [
    new SlashCommandBuilder().setName("daddy").setDescription("Responds with 'Yes, Kitten?'"),
    new SlashCommandBuilder().setName("server").setDescription("Replies with server info"),
    new SlashCommandBuilder().setName("user").setDescription("Replies with user info"),
]
//return an array of file names in the 'commands' folder
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith("js"))

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}

const rest = new REST({version: '9'}).setToken(token);

rest.put(Routes.applicationGuildCommands(botClientId, guildId), {body: commands})
    .then(() => console.log("Successfully registered application commands."))
    .catch(console.error);