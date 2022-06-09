import TestRun from '../testRun.js';
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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async test(testRun: TestRun): Promise<void> {
        throw new Error('Test method is not implemented');
    }
}

export default TestRunner;
