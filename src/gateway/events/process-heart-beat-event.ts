import { SocketService } from "../../services/socket-service.ts";
import { GatewayMessage } from "../gateway-message.ts";
import { GatewayOpcode } from "../gateway-opcode.ts";

export function processHeartBeat(heartbeatMessage: GatewayMessage<GatewayOpcode.HEART_BEAT>, socketService: SocketService): void {
    console.log("[ INFO ] Received heart beat");
    console.log(`[ INFO ]     - Last sequence: ${heartbeatMessage.d}`);

    socketService.send({
        op: GatewayOpcode.HEART_BEAT_ACK,
        d: undefined,
    });

    console.log("[ INFO ] Sent heart beat ack");
}
