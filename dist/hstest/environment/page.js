"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const browserPageHandler_js_1 = __importDefault(require("../handler/browserPageHandler.js"));
const checkResult_js_1 = __importDefault(require("../outcome/checkResult.js"));
const WrongAnswer_js_1 = __importDefault(require("../exception/outcome/WrongAnswer.js"));
const TestPassed_js_1 = __importDefault(require("../exception/outcome/TestPassed.js"));
const element_js_1 = __importDefault(require("./element.js"));
const eventHandler_js_1 = __importDefault(require("../handler/eventHandler.js"));
class Page {
    constructor(url, browser, gotoOptions) {
        this.url = url;
        this.browser = browser;
        this.isOpened = false;
        this.gotoOptions = gotoOptions;
        this.requests = [];
    }
    async open() {
        if (this.isOpened) {
            return;
        }
        this.pageInstance = await this.browser.newPage();
        await this.pageInstance.goto(this.url, this.gotoOptions);
        await browserPageHandler_js_1.default.initHyperskillContext(this.pageInstance);
        await browserPageHandler_js_1.default.initKeyboardEvents(this.pageInstance);
        await this.setUpRequestInterceptor();
        this.isOpened = true;
    }
    setUpRequestInterceptor() {
        this.pageInstance.on('request', async (request) => {
            this.requests.push(request);
        });
    }
    execute(func) {
        return async () => {
            await this.open();
            const result = await this.pageInstance.evaluate(func);
            return checkResult_js_1.default.fromJson(result);
        };
    }
    async viewport() {
        await this.open();
        return this.pageInstance.viewport();
    }
    async setViewport(viewport) {
        await this.open();
        return this.pageInstance.setViewport(viewport);
    }
    async evaluate(func) {
        await this.open();
        const evaluationResult = await this.pageInstance.evaluate(func);
        if (checkResult_js_1.default.isCheckResult(evaluationResult)) {
            if (!evaluationResult.isCorrect) {
                throw new WrongAnswer_js_1.default(evaluationResult.feedback);
            }
            else {
                throw new TestPassed_js_1.default();
            }
        }
        return evaluationResult;
    }
    async _getBodyTag() {
        await this.open();
        const bodySelector = 'body';
        return await element_js_1.default.new(await this.pageInstance.$(bodySelector), null, this.pageInstance);
    }
    async getClient() {
        await this.open();
        return this.pageInstance;
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
        return eventHandler_js_1.default.waitForEvent(eventName, this.pageInstance, null, timeout);
    }
    async exposeFunction(functionName, func) {
        await this.open();
        return this.pageInstance.exposeFunction(functionName, func);
    }
}
exports.default = Page;
//# sourceMappingURL=page.js.map