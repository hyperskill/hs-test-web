"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_js_1 = __importDefault(require("../environment/node.js"));
const testRun_js_1 = __importDefault(require("../testing/testRun.js"));
const jsRunner_js_1 = __importDefault(require("../testing/runner/jsRunner.js"));
const checkResult_js_1 = __importDefault(require("../outcome/checkResult.js"));
const page_js_1 = __importDefault(require("../environment/page.js"));
const UnexpectedError_js_1 = __importDefault(require("../exception/outcome/UnexpectedError.js"));
const outcomeFactory_js_1 = __importDefault(require("../outcome/outcomeFactory.js"));
const WrongAnswer_js_1 = __importDefault(require("../exception/outcome/WrongAnswer.js"));
const unexpectedErrorOutcome_js_1 = __importDefault(require("../outcome/unexpectedErrorOutcome.js"));
class StageTest {
    constructor() {
        this.node = new node_js_1.default();
        this.runner = new jsRunner_js_1.default();
        this.tests = [];
    }
    getPage(url, options = {}) {
        return new page_js_1.default(url, this.runner.browser, options);
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
            throw new UnexpectedError_js_1.default("No tests found!");
        }
        const testRuns = [];
        for (let i = 0; i < this.tests.length; i++) {
            const currTest = i + 1;
            const testCase = await this.tests[i];
            if (!(testCase instanceof Function)) {
                throw new UnexpectedError_js_1.default("Found a wrong test case that is not a function");
            }
            testRuns.push(new testRun_js_1.default(currTest, testCount, testCase, this.runner));
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
                if (!(result instanceof checkResult_js_1.default)) {
                    throw new UnexpectedError_js_1.default('Expected CheckResult instance as a result of the test case');
                }
                if (!result.isCorrect) {
                    throw new WrongAnswer_js_1.default(result.feedback);
                }
            }
        }
        catch (err) {
            let outcome;
            try {
                outcome = outcomeFactory_js_1.default.getOutcome(err, currTest);
            }
            catch (err) {
                throw new Error(new unexpectedErrorOutcome_js_1.default(currTest, err).toString());
            }
            throw new Error(outcome.toString());
        }
        finally {
            try {
                await this.runner.tearDown();
            }
            catch (err) {
                throw new Error(new unexpectedErrorOutcome_js_1.default(currTest, err).toString());
            }
        }
    }
}
exports.default = StageTest;
//# sourceMappingURL=stageTest.js.map