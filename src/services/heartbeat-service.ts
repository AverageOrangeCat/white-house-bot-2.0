import { GatewayOpcode } from "../gateway/gateway-opcode.ts";
import { sleep } from "../utils/sleep.ts";
import { SocketService } from "./socket-service.ts";

enum State {
    RUNNING = "RUNNING",
    STOPPED = "STOPPED",
}

export class HeartbeatService {
    private state: State = State.STOPPED;

    constructor(private socketService: SocketService) {}

    public async start(heartbeatInterval: number): Promise<void> {
        if (this.state === State.RUNNING) return;

        this.state = State.RUNNING;

        while (this.state === State.RUNNING) {
            this.socketService.send({
                op: GatewayOpcode.HEART_BEAT,
                d: null,
            });

            console.log("[ INFO ] Sent heart beat");
            console.log(`[ INFO ]     - Next heart beat in ${heartbeatInterval} ms`);

            await sleep(heartbeatInterval);
        }
    }

    public stop(): void {
        this.state = State.STOPPED;
    }
}
