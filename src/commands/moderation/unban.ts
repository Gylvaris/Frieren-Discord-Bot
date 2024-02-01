import { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } from 'discord.js';

export const unbanCmd = {
    data: new SlashCommandBuilder()
        .setName(`unban`)
        .setDescription(`Removes a ban from a user.`)
        .addUserOption(option =>
            option.setName('target')
                .setDescription(`The user to unban.`)
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription(`The reason for unbanning the user.`)
                .setRequired(false))
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .setDMPermission(false),

    async execute(interaction: any) {

        const target = interaction.options.getMember('target') ?? interaction.member;
        const reason = interaction.options.getString('reason') ?? 'No reason provided';

        const banEmbed = new EmbedBuilder()
            .setTitle(`Unbanned`)
            .setDescription(`Unbnned ${target} bc ${reason}`)
            .setColor('#00F0FF')

        await interaction.reply({ embeds: [banEmbed], ephemeral: true });
        await interaction.guild.members.unban(target);
    },
};