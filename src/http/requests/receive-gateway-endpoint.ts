import { DISCORD_API_URL, TOKEN } from "../../enviroment.ts";
import { GatewayEndpoint } from "../responses/gateway-endpoint.ts";
import { Status } from "../status.ts";

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
