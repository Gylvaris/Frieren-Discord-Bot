import { Event } from '../utils/events.js'
import { message } from './message.js';
import { ready } from './ready.js';

export const Events: Event[] = [
    ready,
    message,
] as Event[];