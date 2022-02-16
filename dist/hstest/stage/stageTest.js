import NodeEnvironment from "../environment/node.js";
import TestRun from "../testing/testRun.js";
import JsRunner from "../testing/runner/jsRunner.js";
import CheckResult from "../outcome/checkResult.js";
import Page from "../environment/page.js";
import UnexpectedError from "../exception/outcome/UnexpectedError.js";
import OutcomeFactory from "../outcome/outcomeFactory.js";
import WrongAnswer from "../exception/outcome/WrongAnswer.js";
import UnexpectedErrorOutcome from "../outcome/unexpectedErrorOutcome.js";
class StageTest {
    constructor() {
        this.node = new NodeEnvironment();
        this.runner = new JsRunner();
        this.tests = [];
    }
    getPage(url) {
        return new Page(url, this.runner.browser);
    }
    printTestNum(testNum) {
        console.log("\x1b[1;31m" + "Start test " + testNum + "\x1b[0m");
    }
    async runTests() {
        await this._runTests();
    }
    async initTests() {
        const testCount = this.tests.length;
        if (testCount === 0) {
            throw new UnexpectedError("No tests found!");
        }
        const testRuns = [];
        for (let i = 0; i < this.tests.length; i++) {
            const currTest = i + 1;
            const testCase = await this.tests[i];
            if (!(testCase instanceof Function)) {
                throw new UnexpectedError("Found a wrong test case that is not a function");
            }
            testRuns.push(new TestRun(currTest, testCount, testCase, this.runner));
        }
        return testRuns;
    }
    async _runTests() {
        let currTest = 0;
        try {
            const testRuns = await this.initTests();
            for (let i = 0; i < testRuns.length; i++) {
                const testRun = testRuns[i];
                currTest++;
                this.printTestNum(currTest);
                if (testRun.isFirstTest()) {
                    await testRun.setUp();
                }
                const result = await testRun.test();
                if (!(result instanceof CheckResult)) {
                    throw new UnexpectedError('Expected CheckResult instance as a result of the test case');
                }
                if (!result.isCorrect) {
                    throw new WrongAnswer(result.feedback);
                }
            }
        }
        catch (err) {
            let outcome;
            try {
                outcome = OutcomeFactory.getOutcome(err, currTest);
            }
            catch (err) {
                throw new Error(new UnexpectedErrorOutcome(currTest, err).toString());
            }
            throw new Error(outcome.toString());
        }
        finally {
            try {
                await this.runner.tearDown();
            }
            catch (err) {
                throw new Error(new UnexpectedErrorOutcome(currTest, err).toString());
            }
        }
    }
}
export default StageTest;
//# sourceMappingURL=stageTest.js.map