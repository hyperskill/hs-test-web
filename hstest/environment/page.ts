import Browser from "../chromium/browser.js";
import BrowserPageHandler from "../handler/browserPageHandler.js";
import CheckResult from "../outcome/checkResult.js";
import WrongAnswer from "../exception/outcome/WrongAnswer.js";
import TestPassed from "../exception/outcome/TestPassed.js";
import puppeteer, {EvaluateFn} from 'puppeteer'

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
}

export default Page;
