import { TOKEN } from "../../enviroment.ts";
import { Intents } from "../../intents.ts";
import { heartbeatWorker } from "../../workers/heartbeat-worker.ts";
import { socketWorker } from "../../workers/socket-worker.ts";
import { GatewayMessage } from "../gateway-message.ts";
import { GatewayOpcode } from "../gateway-opcode.ts";

export function processHelloEvent(helloMessage: GatewayMessage<GatewayOpcode.HELLO>): void {
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

    socketWorker.send(identifyMessage);

    console.log("[ INFO ] Sent identification");

    heartbeatWorker.start(helloMessage.d.heartbeat_interval);
}
