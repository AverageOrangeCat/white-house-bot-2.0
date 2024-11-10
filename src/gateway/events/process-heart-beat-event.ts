import { GatewayMessage } from "../gateway-message.ts";
import { GatewayOpcode } from "../gateway-opcode.ts";

export function processHeartBeat(socket: WebSocket, heartbeatMessage: GatewayMessage<GatewayOpcode.HEART_BEAT>): void {
    const lastSequence = heartbeatMessage.d;

    console.log("[ INFO ] Received heart beat");
    console.log(`[ INFO ]     - Last sequence: ${lastSequence}`);

    const heartbeatAckMessage: GatewayMessage<GatewayOpcode.HEART_BEAT_ACK> = {
        op: GatewayOpcode.HEART_BEAT_ACK,
        d: undefined,
    };

    socket.send(JSON.stringify(heartbeatAckMessage));

    console.log("[ INFO ] Sent heart beat ack");
}
