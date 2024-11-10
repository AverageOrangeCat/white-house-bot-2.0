import { processHeartBeatAckEvent } from "./src/gateway/events/process-heart-beat-ack-event.ts";
import { processHeartBeat } from "./src/gateway/events/process-heart-beat-event.ts";
import { processHelloEvent } from "./src/gateway/events/process-hello-event.ts";
import { GatewayOpcode } from "./src/gateway/gateway-opcode.ts";
import { GatewayMessage } from "./src/gateway/gateway-message.ts";
import { receiveGatewayEndpoint } from "./src/http/requests/receive-gateway-endpoint.ts";

if (import.meta.main) {
    const gatewayEndpoint = await receiveGatewayEndpoint();

    console.log("[ INFO ] Received gateway endpoint");
    console.log(`[ INFO ]     - Url: ${gatewayEndpoint.url}`);
    console.log(`[ INFO ]     - Shards: ${gatewayEndpoint.shards}`);

    console.log("[ INFO ] Received session limits");
    console.log(`[ INFO ]     - Max concurrent connections: ${gatewayEndpoint.session_start_limit.max_concurrency}`);
    console.log(`[ INFO ]     - Total session starts: ${gatewayEndpoint.session_start_limit.total}`);
    console.log(`[ INFO ]     - Remaining session starts: ${gatewayEndpoint.session_start_limit.remaining}`);
    console.log(`[ INFO ]     - Resetting session starts limit in: ${gatewayEndpoint.session_start_limit.reset_after} ms`);

    if (gatewayEndpoint.session_start_limit.remaining === 0) {
        console.error("[ ERROR ] No session start remaining");
        console.error(`[ ERROR ]     - Resetting session starts limit in: ${gatewayEndpoint.session_start_limit.reset_after} ms`);
        Deno.exit(1);
    }

    const socket = new WebSocket(gatewayEndpoint.url);

    socket.addEventListener("message", (message) => {
        // deno-lint-ignore no-explicit-any
        const gatewayMessage: GatewayMessage<any> = JSON.parse(message.data);

        switch (gatewayMessage.op) {
            case GatewayOpcode.HEART_BEAT:
                processHeartBeat(socket, gatewayMessage);
                break;

            case GatewayOpcode.HELLO:
                processHelloEvent(socket, gatewayMessage);
                break;

            case GatewayOpcode.HEART_BEAT_ACK:
                processHeartBeatAckEvent(socket, gatewayMessage);
                break;

            default:
                console.warn("[ WARNING ] An unspecified gateway request received");
                console.warn(`[ WARNING ]     - Opcode: ${gatewayMessage.op}`);
        }
    });
}
