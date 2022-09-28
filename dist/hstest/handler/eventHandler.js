"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EventHandler {
    static async waitForEvent(eventName, pageInstance, elementHandle, timeout = 10000) {
        async function pageFunction(event, elementHandle, timeout) {
            const element = elementHandle || window;
            let isEventHappened = false;
            function listener() {
                isEventHappened = true;
            }
            function sleep(ms) {
                return new Promise(resolve => {
                    setTimeout(resolve, ms);
                });
            }
            const sleepTimeout = 200;
            element.addEventListener(event, listener);
            try {
                const startTime = performance.now();
                const checkTimeout = () => {
                    return (performance.now() - startTime) < (timeout - sleepTimeout);
                };
                while (!isEventHappened) {
                    if (!checkTimeout()) {
                        return false;
                    }
                    await sleep(sleepTimeout);
                }
                return true;
            }
            finally {
                element.removeEventListener(event, listener);
            }
        }
        return pageInstance.evaluate(pageFunction, eventName, elementHandle, timeout);
    }
}
exports.default = EventHandler;
//# sourceMappingURL=eventHandler.js.map