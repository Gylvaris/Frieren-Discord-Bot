import { Event } from '../utils/events.js'
import { ready } from './ready.js';
import { interaction } from './interactionCreate.js';

export const Events: Event[] = [
    ready,
    interaction,
] as Event[];