import { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } from 'discord.js';

export const kickCmd = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription(`Kicks a user from the server.`)
        .addUserOption(option =>
            option.setName('target')
                .setDescription('The user to kick.')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('The reason for kicking the user.')
                .setRequired(false))
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
        .setDMPermission(false),

    async execute(interaction: any) {

        const target = interaction.options.getMember('target') ?? interaction.member;
        const reason = interaction.options.getString('reason') ?? 'No reason provided';

        const kickEmbed = new EmbedBuilder()
            .setTitle(`Kicked`)
            .setDescription(`Kicked ${target} bc ${reason}`)
            .setColor('#00F0FF')

        await interaction.reply({ embeds: [kickEmbed], ephemeral: true });
        await interaction.guild.members.kick(target);
    },
};