"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}
function checkTimeout(startTime, timeout) {
    return (performance.now() - startTime) < timeout;
}
class EventHandler {
    static async waitForEvent(eventName, pageInstance, elementHandle, timeout = 10000) {
        async function pageFunction(event, elementHandle, timeout) {
            const element = elementHandle || window;
            let isEventHappened = false;
            function listener() {
                isEventHappened = true;
            }
            const sleepTimeout = 200;
            element.addEventListener(event, listener);
            try {
                const start = performance.now();
                while (!isEventHappened) {
                    if (!checkTimeout(start, timeout - sleepTimeout)) {
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