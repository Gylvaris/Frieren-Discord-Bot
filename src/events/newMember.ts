import { EmbedBuilder, ChannelType } from 'discord.js';
import { event, Events } from '../utils/events.js';

export const newMember = event(Events.GuildMemberUpdate, async ({ client }, oldMember, newMember) => {
    const channel = await client.channels.fetch('1113202517778636830');
    const role = await newMember.guild.roles.fetch('1113206660358471880');

    if (!channel || channel.type != ChannelType.GuildText) return;

    const welcomeEmbed = new EmbedBuilder()
        .setTitle(`Welcome to the **🌸 ${newMember.guild.name} 🌸**`)
        .setDescription(`Hi **${newMember}**! \n We hope you will enjoy your stay here!`)
        .setThumbnail(newMember.user.displayAvatarURL())
        .setImage('https://secure.static.tumblr.com/940bbaba171f6b2f2dabd11c17fd3f20/kj1pjcr/jxWok11nj/tumblr_static_filename_640_v2.gif')
        .setColor('#00F0FF')
        .setFooter({
            text: `Server member Count: **${newMember.guild.memberCount}**`,
            iconURL: `${newMember.guild.iconURL()}`,
        });

    if (oldMember.pending && !newMember.pending) {
        await channel.send({ content: `${newMember}`, embeds: [welcomeEmbed] });
        const member = await newMember.guild.members.fetch({ user: newMember.id, force: true });
        if (role) {
            await member.roles.add(role);
        }
    }
})