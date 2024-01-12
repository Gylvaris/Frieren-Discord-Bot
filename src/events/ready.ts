import { event, Events } from '../utils/events.js';

export const ready = event(Events.ClientReady, ({ log }, client) => {
    return log(`Logged in as ${client.user.username}!`)
})