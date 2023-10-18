import NodeEnvironment from "../environment/node.js";
import TestRun from "../testing/testRun.js";
import TestRunner from "../testing/runner/runner.js";
import JsRunner from "../testing/runner/jsRunner.js";
import CheckResult from "../outcome/checkResult.js";
import Page from "../environment/page.js";
import UnexpectedError from "../exception/outcome/UnexpectedError.js";
import Outcome from "../outcome/outcome.js";
import OutcomeFactory from "../outcome/outcomeFactory.js";
import WrongAnswer from "../exception/outcome/WrongAnswer.js";
import UnexpectedErrorOutcome from "../outcome/unexpectedErrorOutcome.js";
import * as puppeteer from 'puppeteer';

class StageTest {

    node: NodeEnvironment = new NodeEnvironment();
    runner: TestRunner = new JsRunner();
    tests: NoArgsFunction[] = [];

    constructor() {
    }

    getPage(url: string, options: puppeteer.WaitForOptions = {}): Page {
        return new Page(url, this.runner.browser, options);
    }

    printTestNum(testNum: number): void {
        console.log("\x1b[1;31m" + "Start test " + testNum + "\x1b[0m");
    }

    async runTests(): Promise<void> {
        await this._runTests();
    }

    async initTests(): Promise<TestRun[]> {
        const testCount: number = this.tests.length;

        if (testCount === 0) {
            throw new UnexpectedError("No tests found!");
        }

        const testRuns: TestRun[] = [];

        for (let i = 0; i < this.tests.length; i++) {
            const currTest: number = i + 1;
            const testCase: NoArgsFunction = await this.tests[i];
            if (!(testCase instanceof Function)) {
                throw new UnexpectedError("Found a wrong test case that is not a function");
            }

            testRuns.push(new TestRun(currTest, testCount, testCase, this.runner));
        }

        return testRuns;
    }

    async _runTests(): Promise<void> {
        let currTest = 0;

        try {
            const testRuns: TestRun[] = await this.initTests();

            for (let i = 0; i < testRuns.length; i++) {
                const testRun: TestRun = testRuns[i];

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
        } catch (err: any) {
            let outcome: Outcome;
            try {
                outcome = OutcomeFactory.getOutcome(err, currTest);
            } catch (err: any) {
                throw new Error(
                    new UnexpectedErrorOutcome(currTest, err).toString()
                );
            }
            throw new Error(outcome.toString());
        } finally {
            try {
                await this.runner.tearDown();
            } catch (err: any) {
                throw new Error(new UnexpectedErrorOutcome(currTest, err).toString());
            }
        }
    }
}

export default StageTest;
