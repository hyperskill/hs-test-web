import Browser from "../../chromium/browser.js";
class TestRunner {
    constructor() {
        this.browser = new Browser();
    }
    setUp() {
    }
    tearDown() {
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async test(testRun) {
        throw new Error('Test method is not implemented');
    }
}
export default TestRunner;
//# sourceMappingURL=runner.js.map