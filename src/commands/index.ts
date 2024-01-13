import { pingCmd } from "./test/ping.js";
import { serverCmd } from "./utility/server.js";
import { userCmd } from "./utility/user.js";

export const commands = [
    pingCmd,
    serverCmd,
    userCmd,
];