import puppeteer from "puppeteer";

class EventHandler {
    static async waitForEvent(eventName: string, pageInstance: puppeteer.Page,
                              elementHandle: puppeteer.ElementHandle | null,
                              timeout = 10000): Promise<any> {
        async function pageFunction (event: string, elementHandle: HTMLElement,
                                     timeout: number): Promise<boolean> {
            const element = elementHandle || window;
            let isEventHappened = false;

            function listener () {
                isEventHappened = true;
            }
            function sleep (ms: number) {
                return new Promise(resolve => {
                    setTimeout(resolve, ms);
                });
            }
            const sleepTimeout = 200;

            element.addEventListener(event, listener);

            try {
                const startTime = performance.now();
                const checkTimeout = (): boolean => {
                    return (performance.now() - startTime) < (timeout - sleepTimeout);
                };

                while (!isEventHappened) {
                    if (!checkTimeout()) {
                      return false;
                    }
                    await sleep(sleepTimeout);
                }
                return true;
            } finally {
                element.removeEventListener(event, listener);
            }
        }

        return pageInstance.evaluate(pageFunction, eventName, elementHandle, timeout);
    }
}

export default EventHandler;
