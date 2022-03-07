"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EventHandler {
    static async waitForEvent(eventName, pageInstance, elementHandle, timeout = 10000) {
        return pageInstance.evaluate((event, elementHandle, timeout) => {
            const sleep = (ms) => {
                return new Promise(resolve => setTimeout(resolve, ms));
            };
            const element = elementHandle || window;
            let isEventHappened = false;
            element.addEventListener(event, () => {
                isEventHappened = true;
            });
            return new Promise(async (resolve) => {
                let isWaiting = true;
                const waiter = setTimeout(() => {
                    isWaiting = false;
                    resolve(false);
                }, timeout);
                while (!isEventHappened && isWaiting) {
                    await sleep(200);
                }
                clearTimeout(waiter);
                resolve(true);
            });
        }, eventName, elementHandle, timeout);
    }
}
exports.default = EventHandler;
//# sourceMappingURL=eventHandler.js.map