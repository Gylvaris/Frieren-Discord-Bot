import { event, Events } from '../utils/events.js';

export const message = event(Events.MessageCreate, async ({ log }, msg) => {
    if (msg.content === 'ping') {
        return msg.reply('Weź spierdalaj..');
    }
});