import TestRunner from "./runner.js";
class JsRunner extends TestRunner {
    async test(testRun) {
        return testRun.testCase();
    }
    async setUp() {
        await this.browser.launch();
    }
    async tearDown() {
        await this.browser.close();
    }
}
export default JsRunner;
//# sourceMappingURL=jsRunner.js.map