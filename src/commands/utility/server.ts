import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export const serverCmd = {
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('Provides information about the server.')
        .setDMPermission(false),


    async execute(interaction: any) {

        const serverEmbed = new EmbedBuilder()
            .setTitle(`Server Information`)
            .setAuthor({ name: `${interaction.guild.name}`, iconURL: `${interaction.guild.iconURL()}` })
            .addFields(
                { name: 'ID', value: `${interaction.guild.id}`, inline: true },
                { name: 'Owner', value: `${interaction.guild.owner}` },
                { name: 'Created', value: `<t:${Math.floor(interaction.guild.createdTimestamp / 1000)}> ` },
                { name: 'Members', value: `${interaction.guild.memberCount}` },
                { name: 'Boosts', value: `${interaction.guild.premiumSubscriptionCount}` },
            )
            .setThumbnail(interaction.guild.iconURL())
            .setColor('#00F0FF')
            .setFooter({
                text: `Frieren: Made with love`,
                iconURL: `${interaction.client.user.displayAvatarURL()}`,
            });

        if (!interaction.guild.banner) {
            return await interaction.reply({ embeds: [serverEmbed] })
        };
        const extension = await interaction.guild.banner.startsWith('a_') ? '.gif' : '.png'

        const guildBanner = await `https://cdn.discordapp.com/banners/${interaction.guild.id}/${interaction.guild.banner}${extension}?size=1024`

        const serverBgEmbed = new EmbedBuilder()
            .setTitle(`Server Information`)
            .setAuthor({ name: `${interaction.guild.name}`, iconURL: `${interaction.guild.iconURL()}` })
            .addFields(
                { name: 'ID', value: `${interaction.guild.id}`, inline: true },
                { name: 'Owner', value: `${interaction.guild.owner}` },
                { name: 'Created', value: `<t:${Math.floor(interaction.guild.createdTimestamp / 1000)}> ` },
                { name: 'Members', value: `${interaction.guild.memberCount}` },
                { name: 'Boosts', value: `${interaction.guild.premiumSubscriptionCount}` },
            )
            .setThumbnail(interaction.guild.iconURL())
            .setImage(guildBanner)
            .setColor('#00F0FF')
            .setFooter({
                text: `Frieren: Made with love`,
                iconURL: `${interaction.client.user.displayAvatarURL()}`,
            });

        if (interaction.guild.banner) {
            return await interaction.reply({ embeds: [serverBgEmbed] });
        }
    },
};