import NodeEnvironment from "../environment/node.js";
import TestRun from "../testing/testRun.js";
import TestRunner from "../testing/runner/runner.js";
import JsRunner from "../testing/runner/jsRunner.js";
import CheckResult from "../outcome/checkResult.js";

class StageTest {

    runner: TestRunner = new JsRunner();
    tests: Function[] = [];
    node: NodeEnvironment = new NodeEnvironment();

    async runTests(): Promise<any> {
        await this._runTests()
    }

    async initTests(): Promise<any> {
        const testCount: number = this.tests.length

        if (testCount === 0) {
            throw new Error("No tests found!")
        }

        const testRuns: TestRun[] = []

        for (let i = 0; i < this.tests.length; i++) {
            const currTest: number = i + 1
            const testCase: Function = await this.tests[i];

            testRuns.push(new TestRun(currTest, testCount, testCase, this.runner))
        }

        return testRuns;
    }

    async _runTests() {
        let currTest: number = 0;
        let needTearDown: boolean = false;

        try {
            const testRuns: TestRun[] = await this.initTests();

            for (let i = 0; i < testRuns.length; i++) {
                const testRun: TestRun = testRuns[i];

                currTest++;
                this.printTestNum(currTest)

                if (testRun.isFirstTest()) {
                    await testRun.setUp()
                    needTearDown = true
                }

                const result = await testRun.test()

                if (!(result instanceof CheckResult)) {
                    throw new Error('Expected CheckResult instance as a result of the test case')
                }

                if (!result.isCorrect) {
                    throw new Error(result.feedback)
                }

                if (testRun.isLastTest()) {
                    needTearDown = false
                }
            }
        } catch (err: any) {
            throw err
        } finally {
            try {
                await this.runner.tearDown()
            } catch (err) {
                console.log(err)
            }
        }
    }

    printTestNum(testNum: number) {
        console.log("Start test " + testNum);
    }
}

export default StageTest;
