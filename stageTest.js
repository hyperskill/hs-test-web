const puppeteer = require("puppeteer")
const {CheckResult} = require("./outcome/check_result.js")
const {UnexpectedErrorOutcome} = require("./outcome/unexpected_error.js")
const {WrongAnswerOutcome} = require("./outcome/wrong_answer.js")

class StageTest {

    browser = null;
    tests = [];

    static async new() {
        const browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ['--start-maximized', '--disable-infobar'],
            ignoreDefaultArgs: ['--enable-automation'],
            debug: true,
            devtools: true
        });
        return new this(browser)
    }

    constructor(browser) {
        this.browser = browser
    }

    async newPage(path) {
        const page = await this.browser.newPage();
        await page.goto(path);
        await page.evaluate((CheckResultString) => {
            eval(`window.CheckResult = ${CheckResultString}`);
            this.wrong = CheckResult.wrong;
            this.correct = CheckResult.correct;
        }, CheckResult.toString())
        return page;
    }

    async _closeBrowser() {
        await this.browser.close();
    }

    async onPage(page, test) {
        const _page = await page
        _page.on('console', msg => console.log(msg.text()));
        return async () => {
            return await _page.evaluate(test)
        }
    }

    async onNewPage(path, test) {
        const page = await this.newPage(path)
        page.on('console', msg => console.log(msg.text()));
        return async () => {
            const result = await page.evaluate(test)
            await page.close();
            return result
        }
    }

    async executeTestCases() {
        if (this.tests.length === 0) {
            throw new UnexpectedErrorOutcome(0, "No tests found")
        }

        for (let i = 0; i < this.tests.length; i++) {
            const testNumber = i + 1;
            const currentTest = await this.tests[i];

            if (typeof currentTest !== 'function') {
                throw new UnexpectedErrorOutcome(testNumber, "Found wrong test case that is not a function")
            }

            let result;
            try {
                result = await currentTest()
            } catch (err) {
                if (err.toString().toLowerCase().includes("protocol error")) {
                    throw new WrongAnswerOutcome(testNumber, err.stack)
                }
                throw new UnexpectedErrorOutcome(testNumber, err.stack)
            }

            if (!CheckResult.isInstance(result)) {
                throw new UnexpectedErrorOutcome(testNumber, "Expected result of testing is an instance of CheckResult class")
            }

            if (!result.isCorrect) {
                throw new WrongAnswerOutcome(testNumber, result.feedback)
            }
        }
    }

    async _runTests() {
        try {
            await this.executeTestCases()
        } catch (err) {
            fail(err.toString())
        } finally {
            await this._closeBrowser()
        }
    }

    async runTests() {
        await this._runTests()
    }
}

module.exports = {
    StageTest: StageTest,
    wrong: CheckResult.wrong,
    correct: CheckResult.correct
}
