import { SlashCommandBuilder } from 'discord.js';

export const userCmd = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Provides information about the user.'),
    async execute(interaction: any) {
        await interaction.reply({ content: `This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.` });
    },
};