import { GatewayData } from "./gateway-data.ts";

export type GatewayEntry = {
    [K in keyof GatewayData]: { op: K; d: GatewayData[K] }
}[keyof GatewayData];
