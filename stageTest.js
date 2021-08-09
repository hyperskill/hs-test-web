import puppeteer from "puppeteer"

export default class StageTest {

    browser = null;

    async _runBrowser() {
        this.browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ['--start-maximized', '--disable-infobar'],
            ignoreDefaultArgs: ['--enable-automation'],
            devtools: true
        });
    }

    async _closeBrowser() {
        await this.browser.close();
    }

    async _runTests() {
        await this._runBrowser()
        await this._closeBrowser()
    }

    async runTests() {
        await this._runTests()
    }
}
