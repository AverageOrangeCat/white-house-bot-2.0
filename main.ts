import { Client, Events, GatewayIntentBits } from "npm:discord.js@14.16.3";

if (import.meta.main) {
    const client = new Client({ intents: [GatewayIntentBits.Guilds] });

    client.once(Events.ClientReady, (client) => {
        console.log(`Logged in as ${client.user.tag}`);
    });

    client.login(Deno.env.get("TOKEN"));
}
