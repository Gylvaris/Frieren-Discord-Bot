import { REST, Routes } from 'discord.js';
import { config } from './config.js';
import { commands } from './commands/index.js';

const rest = new REST().setToken(config.clientToken);
const commandsToRegister = commands.map(command => command.data.toJSON());
try {
    console.log(`Started refreshing ${commandsToRegister.length} application (/) commands.`);

    // The put method is used to fully refresh all commands in the guild with the current set
    const data = await rest.put(
        Routes.applicationGuildCommands(config.clientId, config.guildId),
        { body: commandsToRegister },
    ) as any;

    console.log(`Successfully reloaded ${data.length} application (/) commands.`);
} catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
}