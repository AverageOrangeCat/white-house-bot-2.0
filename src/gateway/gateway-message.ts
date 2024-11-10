import { GatewayData } from "./gateway-data.ts";

export type GatewayMessage<T extends keyof GatewayData> = {
    op: T;
    d: GatewayData[T];
    s?: string;
    t?: string;
};
