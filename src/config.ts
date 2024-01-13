import { config as loadEnv } from "dotenv";
import { resolve } from "path";

const envFile = process.env.NODE_ENV === "development"
    ? ".dev.env"
    : ".env";

loadEnv({ path: resolve(process.cwd(), envFile) });

// Define the required environment variables
const requiredEnvVars = ['CLIENT_TOKEN', 'GUILD_ID', 'CLIENT_ID'];

// Validate if each required environment variable exists
for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
        throw new Error(`Missing required environment variable: ${envVar}`);
    }
}

// Create a Config object that includes envs and keys
export const config = {
    clientToken: process.env.CLIENT_TOKEN,
    guildId: process.env.GUILD_ID,
    clientId: process.env.CLIENT_ID,
} as {
    clientToken: string;
    guildId: string;
    clientId: string;
}