import { receiveGatewayEndpoint } from "./src/http/requests/receive-gateway-endpoint.ts";
import { socketWorker } from "./src/workers/socket-worker.ts";

if (import.meta.main) {
    const gatewayEndpoint = await receiveGatewayEndpoint();

    console.log("[ INFO ] Received gateway endpoint");
    console.log(`[ INFO ]     - Url: ${gatewayEndpoint.url}`);
    console.log(`[ INFO ]     - Shards: ${gatewayEndpoint.shards}`);

    console.log("[ INFO ] Received session limits");
    console.log(`[ INFO ]     - Max concurrent connections: ${gatewayEndpoint.session_start_limit.max_concurrency}`);
    console.log(`[ INFO ]     - Total session starts: ${gatewayEndpoint.session_start_limit.total}`);
    console.log(`[ INFO ]     - Remaining session starts: ${gatewayEndpoint.session_start_limit.remaining}`);
    console.log(`[ INFO ]     - Resetting session starts limit in: ${gatewayEndpoint.session_start_limit.reset_after} ms`);

    if (gatewayEndpoint.session_start_limit.remaining === 0) {
        console.error("[ ERROR ] No session start remaining");
        console.error(`[ ERROR ]     - Resetting session starts limit in: ${gatewayEndpoint.session_start_limit.reset_after} ms`);
        Deno.exit(1);
    }

    socketWorker.start(gatewayEndpoint);
}
