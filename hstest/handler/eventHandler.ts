import puppeteer from "puppeteer";


function sleep (ms: number) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

function checkTimeout(startTime: number, timeout: number): boolean {
    return (performance.now() - startTime) < timeout;
}

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
            } finally {
                element.removeEventListener(event, listener);
            }
        }

        return pageInstance.evaluate(pageFunction, eventName, elementHandle, timeout);
    }
}

export default EventHandler;
