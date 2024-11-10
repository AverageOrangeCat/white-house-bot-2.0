import { GatewayMessage } from "../gateway/gateway-message.ts";
import { GatewayOpcode } from "../gateway/gateway-opcode.ts";
import { sleep } from "../utils/sleep.ts";

enum WorkerState {
    RUNNING = "RUNNING",
    STOPPED = "STOPPED",
}

class HeartbeatWorker {
    private workerState: WorkerState = WorkerState.STOPPED;

    public async start(socket: WebSocket, heartbeatInterval: number): Promise<void> {
        if (this.workerState === WorkerState.RUNNING) return;

        this.workerState = WorkerState.RUNNING;

        while (this.workerState === WorkerState.RUNNING) {
            const heartbeatMessage: GatewayMessage<GatewayOpcode.HEART_BEAT> = {
                op: GatewayOpcode.HEART_BEAT,
                d: null,
            };

            socket.send(JSON.stringify(heartbeatMessage));

            console.log("[ INFO ] Sent heart beat");
            console.log(`[ INFO ]     - Next heart beat in ${heartbeatInterval} ms`);

            await sleep(heartbeatInterval);
        }
    }

    public stop(): void {
        this.workerState = WorkerState.STOPPED;
    }
}

export const heartbeatWorker = new HeartbeatWorker();
