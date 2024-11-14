if (import.meta.main) {
    new Worker(import.meta.resolve("./src/services/gateway.ts"), { type: "module" });
}
