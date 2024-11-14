import "../extensions/websocket-extensions.ts";
import { GatewayOpcode } from "../gateway/gateway-opcode.ts";
import { sleep } from "../utils/sleep.ts";
import { socket } from "./gateway.ts";

export enum HeartbeatState {
    RUNNING = "RUNNING",
    STOPPED = "STOPPED",
}

export class Heartbeat {
    private static instance: Heartbeat;

    /**
     * `heartbeatInterval` is the amount of milliseconds to wait for on cycle
     */

    private heartbeatInterval = 45000;
    private heartbeatState = HeartbeatState.STOPPED;

    public static getInstance(): Heartbeat {
        if (!Heartbeat.instance) {
            Heartbeat.instance = new this();
        }

        return Heartbeat.instance;
    }

    public setHeartbeatInterval(heartbeatInterval: number): void {
        this.heartbeatInterval = heartbeatInterval;
    }

    public async startHeartbeat(): Promise<void> {
        if (this.heartbeatState === HeartbeatState.RUNNING) return;

        this.heartbeatState = HeartbeatState.RUNNING;

        while (this.heartbeatState === HeartbeatState.RUNNING) {
            await sleep(this.heartbeatInterval);

            socket.sendGatewayMessage({
                op: GatewayOpcode.HEARTBEAT,
                d: null,
            });

            console.log("[ INFO ] Sent heart beat");
            console.log(`[ INFO ]     - Next heart beat in ${this.heartbeatInterval} ms`);
        }
    }

    public stopHeartbeat(): void {
        this.heartbeatState = HeartbeatState.STOPPED;
    }
}
