import { Client, GatewayIntentBits, Collection } from 'discord.js';
import { Events as Eventy } from 'discord.js';
import { registerEvents } from './utils/events.js';
import { Events } from './events/index.js';
import { config } from './config.js';
import { commands } from './commands/index.js';

export const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
}) as Client & { commands: Collection<string, any>, cooldowns: Collection<number, any> }

client.commands = new Collection();
for (const command of commands) {
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.log(`[WARNING] The command at ${command} is missing a required "data" or "execute" property.`);
    }
}

client.cooldowns = new Collection();

registerEvents(client, Events);

try {
    await client.login(config.clientToken)
} catch (err: unknown) {
    console.error('[Login Error', err);
    process.exit(1);
}