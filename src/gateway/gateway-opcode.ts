/**
 * Source: https://discord.com/developers/docs/topics/opcodes-and-status-codes#gateway-gateway-opcodes
 */ 
export enum GatewayOpcode {

    /**
     * Client Action: Send / Receive
     * Description: Fired periodically by the client to keep the connection alive.
     */

    HEART_BEAT = 1,

    /**
     * Client Action: Send
     * Description: Fired periodically by the client to keep the connection alive.
     */

    IDENTIFY = 2,

    /**
     * Client Action: Receive
     * Description: Starts a new session during the initial handshake.
     */

    HELLO = 10,

    /**
     * Client Action: Receive
     * Description: Sent in response to receiving a heartbeat to acknowledge that it has been received.
     */

    HEART_BEAT_ACK = 11,
}
