//require the necessary discord.js classes
const fs = require("fs");
const {Client, Collection, Intents} = require("discord.js");
const {token} = require('./config.json');
//other packages
const chalk = require("chalk");

//create new client instance
const client = new Client({intents: [Intents.FLAGS.GUILDS]});

//register new command collection
client.commands = new Collection();
//return an array of file names in the 'commands' folder
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith("js"))

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    //set a new item in the collection
    //with the key as the command name and the value as the exported module
    client.commands.set(command.data.name, command);
}

//when the client is ready, run this only once
client.once('ready', () => {
    console.log("I'm ready to be milked, kitten ;)");
});

//listen for commands and interact if command is right
client.on('interactionCreate', async interaction => {
    if(!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if(!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(chalk.redBright("ERROR"), "There was an ERROR executing this command!");
        await interaction.reply({content: "There was an error executing this command!", ephemeral: true});
    }
});

//log into discord with your token
client.login(token);