import { TOKEN } from "../../enviroment.ts";
import { Intents } from "../../intents.ts";
import { HeartbeatService } from "../../services/heartbeat-service.ts";
import { SocketService } from "../../services/socket-service.ts";
import { GatewayMessage } from "../gateway-message.ts";
import { GatewayOpcode } from "../gateway-opcode.ts";

export function processHelloEvent(helloMessage: GatewayMessage<GatewayOpcode.HELLO>, socketService: SocketService, heartbeatService: HeartbeatService): void {
    socketService.send({
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

    heartbeatService.start(helloMessage.d.heartbeat_interval);
}
