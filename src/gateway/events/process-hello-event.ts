import { TOKEN } from "../../enviroment.ts";
import { Intents } from "../../intents.ts";
import { heartbeatWorker } from "../../workers/heartbeat-worker.ts";
import { GatewayMessage } from "../gateway-message.ts";
import { GatewayOpcode } from "../gateway-opcode.ts";

export function processHelloEvent(socket: WebSocket, helloMessage: GatewayMessage<GatewayOpcode.HELLO>): void {
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

    heartbeatWorker.start(socket, heartbeatInterval);
}
