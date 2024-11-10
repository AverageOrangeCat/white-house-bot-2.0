import { GatewayData } from "../gateway/gateway-data.ts";
import { GatewayMessage } from "../gateway/gateway-message.ts";
import { GatewayEndpoint } from "../http/requests/receive-gateway-endpoint.ts";

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

    public onOpen(callback: (openEvent: Event) => void): void {
        this.socket.addEventListener("open", (openEvent) => {
            callback(openEvent);
        });
    }

    public onClose(callback: (closeEvent: CloseEvent) => void): void {
        this.socket.addEventListener("close", (closeEvent) => {
            callback(closeEvent);
        });
    }

    public onError(callback: (errorEvent: Event) => void): void {
        this.socket.addEventListener("error", (errorEvent) => {
            callback(errorEvent);
        });
    }

    public onMessage(callback: (messageEvent: MessageEvent) => void): void {
        this.socket.addEventListener("message", (messageEvent) => {
            callback(messageEvent);
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
