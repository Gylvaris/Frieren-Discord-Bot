import { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } from 'discord.js';

export const untimeoutCmd = {
    data: new SlashCommandBuilder()
        .setName('untimeout')
        .setDescription(`Remove a timeout from user on the server.`)
        .addUserOption(option =>
            option.setName('target')
                .setDescription('Select a user to remove a timeout from.')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('The reason for removing a timeout.')
                .setRequired(false))
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
        .setDMPermission(false),

    async execute(interaction: any) {

        const target = interaction.options.getMember('target') ?? interaction.member;
        let reason = interaction.options.getString('reason') ?? 'No reason provided';

        const untimeoutEmbed = new EmbedBuilder()
            .setTitle(`Timeout Removed`)
            .setDescription(`Timeout removed from ${target} bc ${reason}`)
            .setColor('#00F0FF')

        const untimeoutEmbedDm = new EmbedBuilder()
            .setTitle(`Timeout Removed`)
            .setDescription(`Your timeout has been removed in **${interaction.guild.name}** bc ${reason} \n You can now chat again! And don't do it again..`)
            .setImage(`https://tenor.com/6w8H.gif`)
            .setColor('#00F0FF')

        await interaction.reply({ embeds: [untimeoutEmbed], ephemeral: true });
        try {
            await target.send({ embeds: [untimeoutEmbedDm] });
        } catch (err) {
            return
        }
        await target.timeout(null, reason);
    },
};