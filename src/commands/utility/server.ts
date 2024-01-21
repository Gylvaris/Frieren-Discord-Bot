import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export const serverCmd = {
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('Provides information about the server.'),
    async execute(interaction: any) {
        const serverEmbed = new EmbedBuilder()
            .setTitle(`Information about the ${interaction.guild.name}`)
            .setDescription(`This server is ${interaction.guild.name} and has ${interaction.guild.memberCount} members.`)
            .setColor('#00F0FF')

        await interaction.reply({ embeds: [serverEmbed] });
    },
};