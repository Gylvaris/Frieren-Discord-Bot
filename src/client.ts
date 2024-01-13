import { Client, GatewayIntentBits, Collection } from 'discord.js';
import { Events as Eventy } from 'discord.js';
import { registerEvents } from './utils/events.js';
import { Events } from './events/index.js';
import { config } from './config.js';
import { commands } from './commands/index.js';

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
}) as Client & { commands: Collection<string, any> };

client.commands = new Collection();
for (const command of commands) {
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.log(`[WARNING] The command at ${command} is missing a required "data" or "execute" property.`);
    }
}

registerEvents(client, Events);

client.on(Eventy.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const clientWithCommands = interaction.client as Client & { commands: Collection<string, any> };
    const command = clientWithCommands.commands.get(interaction.commandName);

    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
        } else {
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }
});

try {
    await client.login(config.clientToken)
} catch (err: unknown) {
    console.error('[Login Error', err);
    process.exit(1);
}