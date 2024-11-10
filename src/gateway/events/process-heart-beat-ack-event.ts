import { GatewayMessage } from "../gateway-message.ts";
import { GatewayOpcode } from "../gateway-opcode.ts";

// deno-lint-ignore no-unused-vars
export function processHeartBeatAckEvent(socket: WebSocket, heartbeatAckMessage: GatewayMessage<GatewayOpcode.HEART_BEAT_ACK>) {
    console.log("[ INFO ] Received heart beat ack");
}
