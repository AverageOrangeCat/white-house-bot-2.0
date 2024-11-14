import { GatewayEntry } from "../gateway/gateway-entry.ts";

declare global {
    interface WebSocket {
        sendGatewayMessage(gatewayEntry: GatewayEntry): void;
        onGatewayMessage(callback: (gatewayEntry: GatewayEntry) => void): void;
    }
}

WebSocket.prototype.sendGatewayMessage = function (gatewayEntry: GatewayEntry): void {
    this.send(JSON.stringify(gatewayEntry));
};

WebSocket.prototype.onGatewayMessage = function (callback: (gatewayEntry: GatewayEntry) => void): void {
    this.addEventListener("message", (messageEvent) => {
        callback(JSON.parse(messageEvent.data));
    });
};
