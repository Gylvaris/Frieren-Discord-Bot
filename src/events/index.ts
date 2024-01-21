import { Event } from '../utils/events.js';
import { ready } from './ready.js';
import { interaction } from './interactionCreate.js';
import { newMember } from './newMember.js';

export const Events: Event[] = [
    ready,
    interaction,
    newMember,
] as Event[];