var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
        console.log("Start test " + testNum);
    }
    runTests() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._runTests();
        });
    }
    initTests() {
        return __awaiter(this, void 0, void 0, function* () {
            const testCount = this.tests.length;
            if (testCount === 0) {
                throw new UnexpectedError("No tests found!");
            }
            const testRuns = [];
            for (let i = 0; i < this.tests.length; i++) {
                const currTest = i + 1;
                const testCase = yield this.tests[i];
                if (!(testCase instanceof Function)) {
                    throw new UnexpectedError("Found a wrong test case that is not a function");
                }
                testRuns.push(new TestRun(currTest, testCount, testCase, this.runner));
            }
            return testRuns;
        });
    }
    _runTests() {
        return __awaiter(this, void 0, void 0, function* () {
            let currTest = 0;
            let needTearDown = false;
            try {
                const testRuns = yield this.initTests();
                for (let i = 0; i < testRuns.length; i++) {
                    const testRun = testRuns[i];
                    currTest++;
                    this.printTestNum(currTest);
                    if (testRun.isFirstTest()) {
                        yield testRun.setUp();
                        needTearDown = true;
                    }
                    const result = yield testRun.test();
                    if (!(result instanceof CheckResult)) {
                        throw new UnexpectedError('Expected CheckResult instance as a result of the test case');
                    }
                    if (!result.isCorrect) {
                        throw new WrongAnswer(result.feedback);
                    }
                    if (testRun.isLastTest()) {
                        needTearDown = false;
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
                    yield this.runner.tearDown();
                }
                catch (err) {
                    throw new Error(new UnexpectedErrorOutcome(currTest, err).toString());
                }
            }
        });
    }
}
export default StageTest;
//# sourceMappingURL=stageTest.js.map