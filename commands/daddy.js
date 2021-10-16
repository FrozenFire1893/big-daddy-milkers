const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("daddy")
        .setDescription("Replies with 'Yes, Kitten?'"),
    async execute(interaction) {
        await interaction.reply("Yes, Kitten?");
    }
};