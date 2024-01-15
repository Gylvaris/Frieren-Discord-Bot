import { SlashCommandBuilder } from 'discord.js';

export const pingCmd = {
    cooldown: 3,
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    async execute(interaction: any) {
        await interaction.reply({ content: "Pong!" });
    },
};