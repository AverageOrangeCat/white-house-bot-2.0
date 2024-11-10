/**
 * Secrets
 */

export const TOKEN = Deno.env.get("TOKEN") ?? "";

/**
 * Discord Specification
 */

export const DISCORD_API_VERSION = 10;
export const DISCORD_API_URL = `https://discord.com/api/v${DISCORD_API_VERSION}`;
