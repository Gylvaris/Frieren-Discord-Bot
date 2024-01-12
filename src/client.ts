import { Client, GatewayIntentBits } from 'discord.js';
import { registerEvents } from './utils/events.js';
import { Events } from './events/index.js';
import { Keys } from './config.js';

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

registerEvents(client, Events);

try {
    await client.login(Keys.clientToken)
} catch (err: unknown) {
    console.error('[Login Error', err);
    process.exit(1);
}