import { EmbedBuilder, ChannelType, } from 'discord.js';
import { event, Events } from '../utils/events.js';

export const newMember = event(Events.GuildMemberUpdate, ({ client }, oldMember, newMember) => {
    const channel = client.channels.cache.get('1113202517778636830');

    if (!channel || channel.type != ChannelType.GuildText) return;

    const welcomeEmbed = new EmbedBuilder()
        .setTitle('Welcome to the server!')
        .setDescription('This is a test welcome message!')
        .setColor('#00F0FF')

    if (oldMember.pending && !newMember.pending)
        channel.send({ embeds: [welcomeEmbed] })
})