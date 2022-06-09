import TestRunner from "./runner.js";
import TestRun from "../testRun.js";

class JsRunner extends TestRunner {

    async test(testRun: TestRun): Promise<void> {
        return testRun.testCase();
    }

    async setUp(): Promise<void> {
        await this.browser.launch();
    }

    async tearDown(): Promise<void> {
        await this.browser.close();
    }
}

export default JsRunner;
