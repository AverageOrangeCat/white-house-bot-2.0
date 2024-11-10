import { socketWorker } from "../../workers/socket-worker.ts";
import { GatewayMessage } from "../gateway-message.ts";
import { GatewayOpcode } from "../gateway-opcode.ts";

export function processHeartBeat(heartbeatMessage: GatewayMessage<GatewayOpcode.HEART_BEAT>): void {
    console.log("[ INFO ] Received heart beat");
    console.log(`[ INFO ]     - Last sequence: ${heartbeatMessage.d}`);

    const heartbeatAckMessage: GatewayMessage<GatewayOpcode.HEART_BEAT_ACK> = {
        op: GatewayOpcode.HEART_BEAT_ACK,
        d: undefined,
    };

    socketWorker.send(heartbeatAckMessage);

    console.log("[ INFO ] Sent heart beat ack");
}
