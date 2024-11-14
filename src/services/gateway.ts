import "../extensions/websocket-extensions.ts";
import { receiveGatewayEndpoint } from "../http/requests/receive-gateway-endpoint.ts";
import { processHeartbeatAckEvent } from "../gateway/events/process-heartbeat-ack-event.ts";
import { processHeartbeatEvent } from "../gateway/events/process-heartbeat-event.ts";
import { processHelloEvent } from "../gateway/events/process-hello-event.ts";
import { GatewayOpcode } from "../gateway/gateway-opcode.ts";

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

export let socket: WebSocket;

function waitUntilRunning(): Promise<void> {
    return new Promise((resolve) => {
        if (socket.readyState === WebSocket.OPEN) {
            resolve();
            return;
        }

        socket.addEventListener("open", () => {
            resolve();
        });
    });
}

function waitUntilStopped(): Promise<void> {
    return new Promise((resolve) => {
        if (socket.readyState === WebSocket.CLOSED) {
            resolve();
            return;
        }

        socket.addEventListener("close", () => {
            resolve();
        });
    });
}

export async function startGateway(): Promise<void> {
    socket = new WebSocket(gatewayEndpoint.url);

    socket.onGatewayMessage((gatewayEntry) => {
        switch (gatewayEntry.op) {
            case GatewayOpcode.HEARTBEAT:
                processHeartbeatEvent(gatewayEntry);
                break;

            case GatewayOpcode.HELLO:
                processHelloEvent(gatewayEntry);
                break;

            case GatewayOpcode.HEARTBEAT_ACK:
                processHeartbeatAckEvent();
                break;

            default:
                console.warn("[ WARNING ] An unspecified gateway request received");
                console.warn(`[ WARNING ]     - Opcode: ${gatewayEntry.op}`);
        }
    });

    await waitUntilRunning();
}

export async function stopGateway(): Promise<void> {
    socket.close();

    await waitUntilStopped();
}

await startGateway();
