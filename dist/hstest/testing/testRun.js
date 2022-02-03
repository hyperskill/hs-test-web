import TestPassed from "../exception/outcome/TestPassed.js";
import CheckResult from "../outcome/checkResult.js";
class TestRun {
    constructor(testNum, testCount, testCase, runner) {
        this.testNum = testNum;
        this.testCount = testCount;
        this.testCase = testCase;
        this.runner = runner;
    }
    isFirstTest() {
        return this.testNum === 1;
    }
    isLastTest() {
        return this.testNum === this.testCount;
    }
    async setUp() {
        return this.runner.setUp();
    }
    async tearDown() {
        this.runner.tearDown();
    }
    async test() {
        try {
            return await this.runner.test(this);
        }
        catch (err) {
            if (err instanceof TestPassed) {
                return CheckResult.correct();
            }
            throw err;
        }
    }
}
export default TestRun;
//# sourceMappingURL=testRun.js.map