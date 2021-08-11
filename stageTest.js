const puppeteer = require("puppeteer")

class StageTest {

    browser = null;
    tests = [];

    static async new() {
        const browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ['--start-maximized', '--disable-infobar'],
            ignoreDefaultArgs: ['--enable-automation'],
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
            throw new Error("UE: No tests found")
        }

        const result = await this.tests.filter(async (currentTest) => {
            return await typeof currentTest !== 'function'
        })

        for (let i = 0; i < this.tests.length; i++) {
            const currentTest = await this.tests[i];

            if (typeof currentTest !== 'function') {
                throw new Error("UE: Found wrong test case that is not a function");
            }

            await currentTest()
        }
    }

    async _runTests() {
        try {
            await this.executeTestCases()
        } catch (err) {
            throw err;
        } finally {
            await this._closeBrowser()
        }
    }

    async runTests() {
        await this._runTests()
    }
}

exports.StageTest = StageTest;
