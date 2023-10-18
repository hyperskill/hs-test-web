import {ElementHandle, EvaluateFunc} from 'puppeteer';
import Browser from "../chromium/browser.js";
import BrowserPageHandler from "../handler/browserPageHandler.js";
import CheckResult from "../outcome/checkResult.js";
import WrongAnswer from "../exception/outcome/WrongAnswer.js";
import TestPassed from "../exception/outcome/TestPassed.js";
import Element from "./element.js";
import EventHandler from "../handler/eventHandler.js";
import * as puppeteer from 'puppeteer';

class Page{
    url: string;
    browser: Browser;
    isOpened: boolean;
    pageInstance!: puppeteer.Page;
    gotoOptions: puppeteer.WaitForOptions;
    requests: Array<puppeteer.HTTPRequest>;

    constructor(url: string, browser: Browser, gotoOptions: puppeteer.WaitForOptions) {
        this.url = url;
        this.browser = browser;
        this.isOpened = false;
        this.gotoOptions = gotoOptions;
        this.requests = [];
    }

    async open(): Promise<void> {
        if (this.isOpened) {
            return;
        }
        this.pageInstance = await this.browser.newPage();
        await this.pageInstance.goto(this.url, this.gotoOptions);
        await BrowserPageHandler.initHyperskillContext(this.pageInstance);
        await BrowserPageHandler.initKeyboardEvents(this.pageInstance);
        await this.setUpRequestInterceptor();
        this.isOpened = true;
    }

    setUpRequestInterceptor(): void {
        this.pageInstance.on('request', async request => {
            this.requests.push(request);
        });
    }

    execute(func: NoArgsFunction): NoArgsFunction {
        return async () => {
            await this.open();
            const result = await this.pageInstance.evaluate(func as EvaluateFunc<any>);
            return CheckResult.fromJson(result);
        };
    }

    async viewport() {
        await this.open();
        return this.pageInstance.viewport();
    }

    async setViewport(viewport: puppeteer.Viewport) {
        await this.open();
        return this.pageInstance.setViewport(viewport);
    }

    async evaluate(func: NoArgsFunction): Promise<object> {
        await this.open();
        const evaluationResult = await this.pageInstance.evaluate(func as EvaluateFunc<any>);
        if (CheckResult.isCheckResult(evaluationResult)) {
            if (!evaluationResult.isCorrect) {
                throw new WrongAnswer(evaluationResult.feedback);
            } else {
                throw new TestPassed();
            }
        }
        return evaluationResult;
    }

    async _getBodyTag() {
        await this.open();
        const bodySelector = 'body';
        return await Element.new(
            await this.pageInstance.$(bodySelector) as puppeteer.ElementHandle,
            null,
            this.pageInstance
        );
    }

    async getClient(): Promise<puppeteer.Page> {
        await this.open();
        return this.pageInstance;
    }

    async findById(id: string): Promise<Element | null> {
        return await (await this._getBodyTag()).findById(id);
    }

    async findByClassName(className: string): Promise<Element | null> {
        return await (await this._getBodyTag()).findByClassName(className);
    }

    async findBySelector(selector: string): Promise<Element | null> {
        return await (await this._getBodyTag()).findBySelector(selector);
    }

    async findAllByClassName(className: string): Promise<ElementHandle[] | Element[] | undefined> {
        return await (await this._getBodyTag()).findAllByClassName(className);
    }

    async findAllBySelector(selector: string): Promise<ElementHandle[] | Element[] | undefined> {
        return await (await this._getBodyTag()).findAllBySelector(selector);
    }

    async navigate(url: string) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        await this.pageInstance.navigate(url);
    }

    async refresh() {
        await this.pageInstance.reload({
            waitUntil: 'domcontentloaded'
        });
    }

    currentUrl(): string {
        return this.pageInstance.url();
    }

    async waitForEvent(eventName: string, timeout = 10000) {
        await this.open();
        return EventHandler.waitForEvent(eventName, this.pageInstance, null, timeout);
    }

    async exposeFunction(functionName: string, func: NoArgsFunction) {
        await this.open();
        return this.pageInstance.exposeFunction(functionName, func);
    }
}

export default Page;
