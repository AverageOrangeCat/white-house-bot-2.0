import { processHeartBeatAckEvent } from "../gateway/events/process-heart-beat-ack-event.ts";
import { processHeartBeat } from "../gateway/events/process-heart-beat-event.ts";
import { processHelloEvent } from "../gateway/events/process-hello-event.ts";
import { GatewayMessage } from "../gateway/gateway-message.ts";
import { GatewayOpcode } from "../gateway/gateway-opcode.ts";
import { GatewayEndpoint } from "../http/requests/receive-gateway-endpoint.ts";
import { WorkerState } from "./worker-state.ts";

class SocketWorker {
    private workerState: WorkerState = WorkerState.STOPPED;
    private socket?: WebSocket;

    public start(gatewayEndpoint: GatewayEndpoint): void {
        if (this.workerState === WorkerState.RUNNING) return;

        this.workerState = WorkerState.RUNNING;

        this.socket = new WebSocket(gatewayEndpoint.url);

        this.socket.addEventListener("message", (messageEvent) => {
            // deno-lint-ignore no-explicit-any
            const gatewayMessage: GatewayMessage<any> = JSON.parse(messageEvent.data);

            switch (gatewayMessage.op) {
                case GatewayOpcode.HEART_BEAT:
                    processHeartBeat(gatewayMessage);
                    break;

                case GatewayOpcode.HELLO:
                    processHelloEvent(gatewayMessage);
                    break;

                case GatewayOpcode.HEART_BEAT_ACK:
                    processHeartBeatAckEvent(gatewayMessage);
                    break;

                default:
                    console.warn("[ WARNING ] An unspecified gateway request received");
                    console.warn(`[ WARNING ]     - Opcode: ${gatewayMessage.op}`);
            }
        });

        this.socket.addEventListener("close", (_) => {
            this.workerState = WorkerState.STOPPED;
        });
    }

    public stop(): void {
        this.workerState = WorkerState.STOPPED;
        this.socket?.close();
    }

    // deno-lint-ignore no-explicit-any
    public send(gatewayMessage: GatewayMessage<any>): void {
        if (this.workerState === WorkerState.STOPPED) {
            console.warn("[ WARNING ] Tried to send message but socket is unavailable");
            console.warn(`[ WARNING ]     - Opcode: ${gatewayMessage.op}`);
        }

        this.socket?.send(JSON.stringify(gatewayMessage));
    }
}

export const socketWorker = new SocketWorker();
