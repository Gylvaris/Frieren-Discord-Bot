import { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, PermissionsBitField } from 'discord.js';

export const banCmd = {
    data: new SlashCommandBuilder()
        .setName(`ban`)
        .setDescription(`Bans a user from the server.`)
        .addUserOption(option =>
            option.setName('target')
                .setDescription(`The user to ban.`)
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription(`The reason for banning the user.`)
                .setRequired(false))
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .setDMPermission(false),

    async execute(interaction: any) {

        const target = interaction.options.getMember('target') ?? interaction.member;
        const reason = interaction.options.getString('reason') ?? 'No reason provided';

        const banEmbed = new EmbedBuilder()
            .setTitle(`Banned`)
            .setDescription(`Bnned ${target} bc ${reason}`)
            .setColor('#00F0FF')

        if (!target) return await interaction.reply({ content: `The user mentioned is no longer within the server.`, ephemeral: true });
        if (interaction.member.id === target.id) return await interaction.reply({ content: `You can't ban yourself.`, ephemeral: true });
        if (target.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({ content: `You can't ban a administrator.`, ephemeral: true });

        await interaction.reply({ embeds: [banEmbed], ephemeral: true });
        await interaction.guild.members.ban(target);
    },
};