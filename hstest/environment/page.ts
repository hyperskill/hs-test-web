import Browser from "../chromium/browser.js";
import BrowserPageHandler from "../handler/browserPageHandler.js";
import CheckResult from "../outcome/checkResult.js";
import WrongAnswer from "../exception/outcome/WrongAnswer.js";
import TestPassed from "../exception/outcome/TestPassed.js";
import puppeteer, {ElementHandle, EvaluateFn} from 'puppeteer'
import Element from "./element.js"

class Page {
    url: string;
    browser: Browser;
    isOpened: boolean;
    pageInstance!: puppeteer.Page

    constructor(url: string, browser: Browser) {
        this.url = url;
        this.browser = browser;
        this.isOpened = false;
    }

    async open(): Promise<void> {
        if (this.isOpened) {
            return;
        }
        this.pageInstance = await this.browser.newPage();
        await this.pageInstance.goto(this.url);
        await BrowserPageHandler.initHyperskillContext(this.pageInstance);
        this.isOpened = true;
    }

    execute(func: Function): Function {
        return async () => {
            await this.open();
            const result = await this.pageInstance.evaluate(func as EvaluateFn);
            return CheckResult.fromJson(result);
        }
    }

    async evaluate(func: Function): Promise<object> {
        await this.open();
        const evaluationResult = await this.pageInstance.evaluate(func as EvaluateFn);
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
        await this.open()
        const bodySelector = 'body'
        return new Element(
            await this.pageInstance.$(bodySelector) as puppeteer.ElementHandle,
            bodySelector,
            null,
            this.pageInstance
        );
    }

    async findById(id: string): Promise<Element | null> {
        return await (await this._getBodyTag()).findById(id)
    }

    async findByClassName(className: string): Promise<Element | null> {
        return await (await this._getBodyTag()).findByClassName(className)
    }

    async findBySelector(selector: string): Promise<Element | null> {
        return await (await this._getBodyTag()).findBySelector(selector)
    }

    async findAllByClassName(className: string): Promise<ElementHandle[] | Element[] | undefined> {
        return await (await this._getBodyTag()).findAllByClassName(className)
    }

    async findAllBySelector(selector: string): Promise<ElementHandle[] | Element[] | undefined> {
        return await (await this._getBodyTag()).findAllBySelector(selector)
    }

    async navigate(url: string) {
        // @ts-ignore
        await this.pageInstance.navigate(url)
    }

    async refresh() {
        await this.pageInstance.reload({
            waitUntil: 'domcontentloaded'
        })
    }

    currentUrl(): string {
        return this.pageInstance.url()
    }
}

export default Page;