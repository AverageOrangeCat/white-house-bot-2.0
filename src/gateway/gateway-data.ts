import { GatewayOpcode } from "./gateway-opcode.ts";

export type GatewayData = {
    [GatewayOpcode.HEARTBEAT]: number | null;

    [GatewayOpcode.IDENTIFY]: {
        token: string;
        intents: number;
        properties: {
            os: string;
            browser: string;
            device: string;
        };
    };

    [GatewayOpcode.HELLO]: {
        heartbeat_interval: number;
    };

    [GatewayOpcode.HEARTBEAT_ACK]: undefined;
};
