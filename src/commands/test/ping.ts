import { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } from 'discord.js';


export const pingCmd = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Checks the bot ping!')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDMPermission(false),

    async execute(interaction: any) {
        const pingEmbed = new EmbedBuilder()
            .setTitle('Checking the bot ping...')
            .setDescription(`Bot ping: **${interaction.client.ws.ping}ms**!`)
            .setColor('#00F0FF')

        await interaction.reply({ embeds: [pingEmbed] });
    },
};