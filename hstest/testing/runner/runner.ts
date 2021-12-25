import TestRun from '../testRun.js'
import Browser from "../../chromium/browser.js";

class TestRunner {

    browser: Browser;

    constructor() {
        this.browser = new Browser();
    }

    setUp(): void {
    }

    tearDown(): void {
    }

    async test(testRun: TestRun): Promise<any> {
        throw new Error('Test method is not implemented')
    }
}

export default TestRunner;
