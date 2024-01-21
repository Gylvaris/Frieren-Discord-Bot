import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export const userCmd = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Provides information about the user.'),
    async execute(interaction: any) {
        const userEmbed = new EmbedBuilder()
            .setTitle(`Information about ${interaction.user.username}`)
            .setDescription(`This user is ${interaction.user.username} and has the ID ${interaction.user.id}.`)
            .setColor('#00F0FF')

        await interaction.reply({ embeds: [userEmbed] });
    },
};