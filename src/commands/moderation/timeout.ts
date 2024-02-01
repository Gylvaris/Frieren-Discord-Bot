import { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, PermissionsBitField } from 'discord.js';

export const timeoutCmd = {
    data: new SlashCommandBuilder()
        .setName('timeout')
        .setDescription(`Timeout a user in the server.`)
        .addUserOption(option =>
            option.setName('target')
                .setDescription('User to mute.')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('The reason for mute the user.')
                .setRequired(false))
        .addStringOption(option =>
            option.setName('time')
                .setDescription('The time for mute the user.')
                .setRequired(false)
                .addChoices(
                    { name: '1 minute', value: '60' },
                    { name: '5 minutes', value: '300' },
                    { name: '1 hour', value: '3600' },
                    { name: '1 day', value: '86400' },
                    { name: '1 week', value: '604800' },
                ))
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
        .setDMPermission(false),

    async execute(interaction: any) {

        const target = interaction.options.getMember('target') ?? interaction.member;
        let reason = interaction.options.getString('reason') ?? 'No reason provided';
        const duration = interaction.options.getString('time');

        if (!target) return await interaction.reply({ content: `The user mentioned is no longer within the server.`, ephemeral: true });
        if (interaction.member.id === target.id) return await interaction.reply({ content: `You can't timeout yourself.`, ephemeral: true });
        if (target.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({ content: `You can't timeout a administrator.`, ephemeral: true });

        const timeoutEmbed = new EmbedBuilder()
            .setTitle(`Muted`)
            .setDescription(`Muted ${target} bc ${reason}, for ${duration / 60} minute(s)`)
            .setColor('#00F0FF')

        const timeoutEmbedDm = new EmbedBuilder()
            .setTitle(`Muted`)
            .setDescription(`You have been muted in **${interaction.guild.name}** bc ${reason}, for ${duration / 60} minute(s)`)
            .setImage(`https://tenor.com/bTIZ9.gif`)
            .setColor('#00F0FF')

        const DmErrorEmbed = new EmbedBuilder()
            .setTitle(`Error`)
            .setDescription(`You can't send dm to this user.`)
            .setColor('#FF0000')

        await interaction.reply({ embeds: [timeoutEmbed], ephemeral: true });
        await target.timeout(duration * 1000, reason);
        try {
            await target.send({ embeds: [timeoutEmbedDm] });
        } catch (err) {
            return await interaction.editReply({ embeds: [DmErrorEmbed], ephemeral: true });
        }
    },
};