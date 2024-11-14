/**
 * Sources:
 *     - https://discord.com/developers/docs/topics/opcodes-and-status-codes#gateway-gateway-opcodes
 *     - https://discord.com/developers/docs/topics/opcodes-and-status-codes#gateway-gateway-close-event-codes
 */

export enum GatewayOpcode {
    /**
     * Client Action: Receive
     * Description: An event was dispatched.
     */

    DISPATCH = 0,

    /**
     * Client Action: Send / Receive
     * Description: Fired periodically by the client to keep the connection alive.
     */

    HEARTBEAT = 1,

    /**
     * Client Action: Send
     * Description: Starts a new session during the initial handshake.
     */

    IDENTIFY = 2,

    /**
     * Client Action: Send
     * Description: Update the client's presence.
     */

    PRESENCE_UPDATE = 3,

    /**
     * Client Action: Send
     * Description: Used to join/leave or move between voice channels.
     */

    VOICE_STATE_UPDATE = 4,

    /**
     * Client Action: Send
     * Description: Resume a previous session that was disconnected.
     */

    RESUME = 6,

    /**
     * Client Action: Receive
     * Description: You should attempt to reconnect and resume immediately.
     */

    RECONNECT = 7,

    /**
     * Client Action: Send
     * Description: Request information about offline guild members in a large guild.
     */

    REQUEST_GUILD_MEMBERS = 8,

    /**
     * Client Action: Receive
     * Description: The session has been invalidated. You should reconnect and identify/resume accordingly.
     */

    INVALID_SESSION = 9,

    /**
     * Client Action: Receive
     * Description: Sent immediately after connecting, contains the `heartbeat_interval` to use.
     */

    HELLO = 10,

    /**
     * Client Action: Receive
     * Description: Sent in response to receiving a heartbeat to acknowledge that it has been received.
     */

    HEARTBEAT_ACK = 11,

    /**
     * Explanation: We're not sure what went wrong. Try reconnecting?
     * Reconnect: true
     */

    REQUEST_SOUNDBOARD_SOUNDS = 31,

    /**
     * Explanation: We're not sure what went wrong. Try reconnecting?
     * Reconnect: true
     */

    UNKNOWN_ERROR = 4000,

    /**
     * Explanation: You sent an invalid Gateway opcode or an invalid payload for an opcode. Don't do that!
     * Reconnect: true
     */

    UNKNOWN_OPCODE = 4001,

    /**
     * Explanation: You sent an invalid payload to Discord. Don't do that!
     * Reconnect: true
     */

    DECODE_ERROR = 4002,

    /**
     * Explanation: You sent us a payload prior to identifying, or this session has been invalidated.
     * Reconnect: true
     */

    NOT_AUTHENTICATED = 4003,

    /**
     * Explanation: The account token sent with your identify payload is incorrect.
     * Reconnect: false
     */

    AUTHENTICATION_FAILED = 4004,

    /**
     * Explanation: You sent more than one identify payload. Don't do that!
     * Reconnect: true
     */

    ALREADY_AUTHENTICATED = 4005,

    /**
     * Explanation: The sequence sent when resuming the session was invalid. Reconnect and start a new session.
     * Reconnect: true
     */

    INVALID_SEQUENCE = 4007,

    /**
     * Explanation: Woah nelly! You're sending payloads to us too quickly. Slow it down! You will be disconnected on receiving this.
     * Reconnect: true
     */

    RATE_LIMITED = 4008,

    /**
     * Explanation: Your session timed out. Reconnect and start a new one.
     * Reconnect: true
     */

    SESSION_TIME_OUT = 4009,
    /**
     * Explanation: You sent us an invalid shard when identifying.
     * Reconnect: false
     */

    INVALID_SHARD = 4010,

    /**
     * Explanation: The session would have handled too many guilds - you are required to shard your connection in order to connect.
     * Reconnect: false
     */

    SHARDING_REQUIRED = 4011,

    /**
     * Explanation: You sent an invalid version for the gateway.
     * Reconnect: false
     */

    INVALID_API_VERSION = 4012,

    /**
     * Explanation: You sent an invalid intent for a Gateway Intent. You may have incorrectly calculated the bitwise value.
     * Reconnect: false
     */

    INVALID_INTENTS = 4013,

    /**
     * Explanation: You sent a disallowed intent for a Gateway Intent. You may have tried to specify an intent that you have not enabled or are not approved for.
     * Reconnect: false
     */

    DISALLOWED_INTENTS = 4014,
}
