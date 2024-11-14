import "../../extensions/websocket-extensions.ts";
import { TOKEN } from "../../enviroment.ts";
import { Intents } from "../../intents.ts";
import { GatewayMessage } from "../gateway-message.ts";
import { GatewayOpcode } from "../gateway-opcode.ts";
import { Heartbeat } from "../../services/heartbeat.ts";
import { socket } from "../../services/gateway.ts";

export function processHelloEvent(gatewayMesage: GatewayMessage<GatewayOpcode.HELLO>): void {
    socket.sendGatewayMessage({
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
    });

    console.log("[ INFO ] Sent identification");

    const heartbeat = Heartbeat.getInstance();

    heartbeat.setHeartbeatInterval(gatewayMesage.d.heartbeat_interval);
    heartbeat.startHeartbeat();
}
