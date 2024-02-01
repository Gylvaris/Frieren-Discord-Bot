import { pingCmd } from "./test/ping.js";
import { serverCmd } from "./utility/server.js";
import { userCmd } from "./utility/user.js";
import { kickCmd } from "./moderation/kick.js";
import { banCmd } from "./moderation/ban.js";
import { timeoutCmd } from "./moderation/timeout.js";
import { untimeoutCmd } from "./moderation/untimeout.js";
import { unbanCmd } from "./moderation/unban.js";

export const commands = [
    pingCmd,
    serverCmd,
    userCmd,
    kickCmd,
    banCmd,
    timeoutCmd,
    untimeoutCmd,
    unbanCmd,
];