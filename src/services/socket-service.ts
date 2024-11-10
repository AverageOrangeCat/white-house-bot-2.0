import { GatewayData } from "../gateway/gateway-data.ts";
import { GatewayEndpoint } from "../gateway/gateway-endpoint.ts";
import { GatewayMessage } from "../gateway/gateway-message.ts";

export class SocketService {
    private socket: WebSocket;

    constructor(private gatewayEndpoint: GatewayEndpoint) {
        this.socket = new WebSocket(this.gatewayEndpoint.url);
    }

    public waitUntilOpen(): Promise<void> {
        return new Promise((resolve, _) => {
            if (this.socket.OPEN) resolve();
            this.socket.addEventListener("open", (_) => resolve());
        });
    }

    public waitUntilClosed(): Promise<void> {
        return new Promise((resolve, _) => {
            if (this.socket.CLOSED) resolve();
            this.socket.addEventListener("close", (_) => resolve());
        });
    }

    // deno-lint-ignore no-explicit-any
    public onMessage(callback: (gatewayMessage: GatewayMessage<any>) => void): void {
        this.socket.addEventListener("message", (messageEvent) => {
            // deno-lint-ignore no-explicit-any
            const gatewayMessage: GatewayMessage<any> = JSON.parse(messageEvent.data);
            callback(gatewayMessage);
        });
    }

    public async stop(): Promise<void> {
        if (this.socket.OPEN) {
            this.socket.close();
        }

        await this.waitUntilClosed();
    }

    public async restart(): Promise<void> {
        await this.stop();

        this.socket = new WebSocket(this.gatewayEndpoint.url);

        await this.waitUntilOpen();
    }

    public async send<T extends keyof GatewayData>(gatewayMessage: GatewayMessage<T>): Promise<void> {
        if (!this.socket.OPEN) {
            console.warn("[ WARNING ] Socket is closed but a new message has arrived");

            await this.restart();

            console.info("[ INFO ] Socket has been restared");
        }

        this.socket.send(JSON.stringify(gatewayMessage));
    }
}
