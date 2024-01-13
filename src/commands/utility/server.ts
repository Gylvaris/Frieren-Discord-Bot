import { SlashCommandBuilder } from 'discord.js';

export const serverCmd = {
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('Provides information about the server.'),
    async execute(interaction: any) {
        await interaction.reply({ content: `This server is ${interaction.guild.name} and has ${interaction.guild.memberCount} members.` });
    },
};