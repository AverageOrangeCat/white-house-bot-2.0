import { TOKEN, DISCORD_API_URL } from "../../enviroment.ts";
import { Status } from "../status.ts";

export type GatewayEndpoint = {
    url: string;
    shards: number;
    session_start_limit: {
        total: number;
        remaining: number;
        reset_after: number;
        max_concurrency: number;
    };
};

export async function receiveGatewayEndpoint(): Promise<GatewayEndpoint> {
    const response = await fetch(`${DISCORD_API_URL}/gateway/bot`, {
        method: "GET",
        headers: {
            Authorization: `Bot ${TOKEN}`,
        },
    });

    switch (response.status) {
        case Status.OK:
            break;

        default:
            console.error("[ ERROR ] An unspecified http error code occured");
            console.error(`[ ERROR ]     - Url: ${response.url}`);
            console.error(`[ ERROR ]     - Status: ${response.status}`);
            Deno.exit(1);
    }

    return await response.json();
}
