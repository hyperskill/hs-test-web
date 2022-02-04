import BrowserPageHandler from "../handler/browserPageHandler.js";
import CheckResult from "../outcome/checkResult.js";
import WrongAnswer from "../exception/outcome/WrongAnswer.js";
import TestPassed from "../exception/outcome/TestPassed.js";
import Element from "./element.js";
class Page {
    constructor(url, browser) {
        this.url = url;
        this.browser = browser;
        this.isOpened = false;
    }
    async open() {
        if (this.isOpened) {
            return;
        }
        this.pageInstance = await this.browser.newPage();
        await this.pageInstance.goto(this.url);
        await BrowserPageHandler.initHyperskillContext(this.pageInstance);
        this.isOpened = true;
    }
    execute(func) {
        return async () => {
            await this.open();
            const result = await this.pageInstance.evaluate(func);
            return CheckResult.fromJson(result);
        };
    }
    async evaluate(func) {
        await this.open();
        const evaluationResult = await this.pageInstance.evaluate(func);
        if (CheckResult.isCheckResult(evaluationResult)) {
            if (!evaluationResult.isCorrect) {
                throw new WrongAnswer(evaluationResult.feedback);
            }
            else {
                throw new TestPassed();
            }
        }
        return evaluationResult;
    }
    async _getBodyTag() {
        await this.open();
        const bodySelector = 'body';
        return new Element(await this.pageInstance.$(bodySelector), bodySelector, null, this.pageInstance);
    }
    async findById(id) {
        return await (await this._getBodyTag()).findById(id);
    }
    async findByClassName(className) {
        return await (await this._getBodyTag()).findByClassName(className);
    }
    async findBySelector(selector) {
        return await (await this._getBodyTag()).findBySelector(selector);
    }
    async findAllByClassName(className) {
        return await (await this._getBodyTag()).findAllByClassName(className);
    }
    async findAllBySelector(selector) {
        return await (await this._getBodyTag()).findAllBySelector(selector);
    }
    async navigate(url) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        await this.pageInstance.navigate(url);
    }
    async refresh() {
        await this.pageInstance.reload({
            waitUntil: 'domcontentloaded'
        });
    }
    currentUrl() {
        return this.pageInstance.url();
    }
    async waitForEvent(eventName, timeout = 10000) {
        await this.open();
        return this.pageInstance.evaluate((event, timeout) => {
            const sleep = (ms) => {
                return new Promise(resolve => setTimeout(resolve, ms));
            };
            let isEventHappened = false;
            window.addEventListener(event, () => {
                isEventHappened = true;
            });
            // eslint-disable-next-line no-async-promise-executor
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
        }, eventName, timeout);
    }
}
export default Page;
//# sourceMappingURL=page.js.map