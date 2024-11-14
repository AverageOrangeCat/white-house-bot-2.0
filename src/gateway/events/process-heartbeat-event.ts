import "../../extensions/websocket-extensions.ts";
import { socket } from "../../services/gateway.ts";
import { GatewayMessage } from "../gateway-message.ts";
import { GatewayOpcode } from "../gateway-opcode.ts";

export function processHeartbeatEvent(gatewayMesage: GatewayMessage<GatewayOpcode.HEARTBEAT>): void {
    console.log("[ INFO ] Received heart beat");
    console.log(`[ INFO ]     - Last sequence: ${gatewayMesage.d}`);

    socket.sendGatewayMessage({
        op: GatewayOpcode.HEARTBEAT_ACK,
        d: undefined,
    });

    console.log("[ INFO ] Sent heart beat ack");
}
