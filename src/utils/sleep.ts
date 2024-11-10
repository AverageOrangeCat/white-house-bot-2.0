/**
 * Description: Waits the amouint of `delay` milliseconds
 */
export function sleep(delay: number): Promise<void> {
    return new Promise((resolve, _) => { setTimeout(() => resolve(), delay) });
}
