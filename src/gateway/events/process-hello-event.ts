import { TOKEN } from "../../enviroment.ts";
import { GatewayMessage } from "../gateway-message.ts";
import { sleep } from "../../utils/sleep.ts";
import { GatewayOpcode } from "../gateway-opcode.ts";
import { Intents } from "../../intents.ts";

export async function processHelloEvent(socket: WebSocket, helloMessage: GatewayMessage<GatewayOpcode.HELLO>): Promise<void> {
    const heartbeatInterval = helloMessage.d.heartbeat_interval;
    const identifyMessage: GatewayMessage<GatewayOpcode.IDENTIFY> = {
        op: GatewayOpcode.IDENTIFY,
        d: {
            token: TOKEN,
            intents: Intents.GUILDS + Intents.GUILD_MESSAGES,
            properties: {
                os: "linux",
                browser: "white-house-bot-2.0",
                device: "white-house-bot-2.0",
            },
        },
    };

    socket.send(JSON.stringify(identifyMessage));

    console.log("[ INFO ] Sent identification");

    while (true) {
        const heartbeatMessage: GatewayMessage<GatewayOpcode.HEART_BEAT> = {
            op: GatewayOpcode.HEART_BEAT,
            d: null,
        };

        socket.send(JSON.stringify(heartbeatMessage));

        console.log("[ INFO ] Sent heart beat");
        console.log(`[ INFO ]     - Next heart beat in ${heartbeatInterval} ms`);
        await sleep(heartbeatInterval);
    }
}
