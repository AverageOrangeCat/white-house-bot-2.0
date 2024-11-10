import { SocketService } from "../../services/socket-service.ts";
import { GatewayMessage } from "../gateway-message.ts";
import { GatewayOpcode } from "../gateway-opcode.ts";

// deno-lint-ignore no-unused-vars
export function processHeartBeatAckEvent(heartbeatAckMessage: GatewayMessage<GatewayOpcode.HEART_BEAT_ACK>, socketService: SocketService) {
    console.log("[ INFO ] Received heart beat ack");
}
