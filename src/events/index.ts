import { Event } from '../utils/index.js'
import message from './message.js';
import ready from './ready.js';

export default [
    ready,
    message,
] as Event[];