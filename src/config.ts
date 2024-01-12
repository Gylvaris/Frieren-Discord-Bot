import { getEnvVar } from "./utils/env.js";

// Define the required environment variables
const requiredEnvVars = ['CLIENT_TOKEN'];

// Validate if each required environment variable exists
for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
        throw new Error(`Missing required environment variable: ${envVar}`);
    }
}

export const Keys = {
    clientToken: getEnvVar("CLIENT_TOKEN"),
}

// Create a Config object that includes envs and keys
export const Config = {
    envs: process.env,
    keys: Keys,
}