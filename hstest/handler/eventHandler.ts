import puppeteer from "puppeteer";

class EventHandler {
    static async waitForEvent(eventName: string, pageInstance: puppeteer.Page, elementHandle: puppeteer.ElementHandle | null, timeout = 10000): Promise<any> {
        return pageInstance.evaluate((event, elementHandle, timeout) => {
            const sleep = (ms: number) => {
                return new Promise(resolve => setTimeout(resolve, ms));
            };

            const element = elementHandle || window;
            let isEventHappened = false;

            element.addEventListener(event, () => {
                isEventHappened = true;
            });

            return new Promise(async resolve => {
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

export default EventHandler;
