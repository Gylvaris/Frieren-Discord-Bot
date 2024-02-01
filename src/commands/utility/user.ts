import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export const userCmd = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Provides information about the user.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('User to get information.')
                .setRequired(false)),

    async execute(interaction: any) {

        const target = interaction.options.getMember('user') ?? interaction.member;
        const boostingTime = target.premiumSinceTimestamp ? `<t:${Math.floor(target.premiumSinceTimestamp / 1000)}>` : 'Not a Booster';


        const userEmbed = new EmbedBuilder()
            .setTitle(`User Information`)
            .setAuthor({ name: `${target.user.username}`, iconURL: `${target.user.displayAvatarURL()}` })
            .addFields(
                { name: 'ID', value: `${target.id}`, inline: true },
                { name: 'Nickname', value: `${target.nickname ?? 'None'}`, inline: true },
                { name: 'Join Date', value: `<t:${Math.floor(target.joinedTimestamp / 1000)}> ` },
                { name: 'Account Created', value: `<t:${Math.floor(target.user.createdTimestamp / 1000)}> ` },
                { name: 'Boosting since', value: `${boostingTime}` },
            )
            .setThumbnail(target.displayAvatarURL())
            .setColor('#00F0FF')
            .setFooter({
                text: `Frieren: Made with love`,
                iconURL: `${interaction.client.user.displayAvatarURL()}`,
            });

        const userwithBanner = await target.guild.members.fetch({ user: target.id, force: true });

        if (!userwithBanner.user.banner) return await interaction.reply({ embeds: [userEmbed] });
        const extension = await userwithBanner.user.banner.startsWith('a_') ? '.gif' : '.png'

        const userBanner = await `https://cdn.discordapp.com/banners/${userwithBanner.id}/${userwithBanner.user.banner}${extension}?size=1024`

        const userWithBannerEmbed = await new EmbedBuilder()
            .setTitle(`User Information`)
            .setAuthor({ name: `${target.user.username}`, iconURL: `${target.user.displayAvatarURL()}` })
            .addFields(
                { name: 'ID', value: `${target.id}`, inline: true },
                { name: 'Nickname', value: `${target.nickname ?? 'None'}`, inline: true },
                { name: 'Join Date', value: `<t:${Math.floor(target.joinedTimestamp / 1000)}> ` },
                { name: 'Account Created', value: `<t:${Math.floor(target.user.createdTimestamp / 1000)}> ` },
                { name: 'Boosting since', value: `${boostingTime}` },
            )
            .setThumbnail(target.displayAvatarURL())
            .setColor('#00F0FF')
            .setImage(userBanner)
            .setFooter({
                text: `Frieren: Made with love`,
                iconURL: `${interaction.client.user.displayAvatarURL()}`,
            });


        if (userwithBanner.user.banner) {
            console.log(userwithBanner)
            return await interaction.reply({ embeds: [userWithBannerEmbed] })
        }
    },
};