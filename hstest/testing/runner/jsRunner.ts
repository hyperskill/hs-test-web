import TestRunner from "./runner.js";
import TestRun from "../testRun.js";

class JsRunner extends TestRunner {

    async test(testRun: TestRun): Promise<any> {
        return testRun.testCase();
    }

    async setUp(): Promise<any> {
        await this.browser.launch();
    }

    async tearDown(): Promise<any> {
        await this.browser.close();
    }
}

export default JsRunner;
