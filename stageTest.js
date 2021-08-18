const puppeteer = require("puppeteer")
const {CheckResult} = require("./outcome/check_result.js")
const {PureJsApplicationRunner} = require("./testing/runner/pure_js_application_runner.js")
const {TestRun} = require("./testing/test_run.js")
const {Page} = require("./environemnt/page.js")
const {NodeEnvironment} = require("./environemnt/node.js")
const {Browser} = require("./chrome/browser.js")
const {UnexpectedError} = require("./exception/unexpected_error.js")
const {WrongAnswer} = require("./exception/wrong_answer.js")
const {Outcome} = require("./outcome/outcome.js")

class StageTest {

    runner = new PureJsApplicationRunner();

    node = new NodeEnvironment();
    tests = [];

    printTestNum(testNum) {
        console.log("Start test " + testNum);
    }

    getPage(url) {
        return new Page(url, this.runner.browser)
    }

    async initTests() {
        const testCount = this.tests.length;

        if (testCount === 0) {
            throw new UnexpectedError("No tests found");
        }

        const testRuns = []

        for (let i = 0; i < this.tests.length; i++) {
            const currTest = i + 1;
            const testCase = await this.tests[i];

            if (typeof testCase !== 'function') {
                throw new UnexpectedError("Found wrong test case that is not a function");
            }

            testRuns.push(new TestRun(currTest, testCount, testCase, this.runner))
        }

        return testRuns
    }

    async _runTests() {
        let currTest = 0;
        let needTearDown = false;
        let currentTestRun = null;

        try {
            const testRuns = await this.initTests();

            for (let i = 0; i < testRuns.length; i++) {
                const testRun = testRuns[i];

                currTest++;
                this.printTestNum(currTest)

                if (testRun.isFirstTest()) {
                    await testRun.setUp()
                    needTearDown = true
                }

                currentTestRun = testRun
                const result = await testRun.test()

                if (!result.correct) {
                    throw new WrongAnswer(result.feedback)
                }

                if (testRun.isLastTest()) {
                    needTearDown = false
                    await testRun.tearDown()
                }
            }
        } catch (err) {
            const outcome = Outcome.getOutcome(err, currTest);
            fail(outcome.toString())
        } finally {
            this.runner.tearDown()
        }
    }

    async runTests() {
        await this._runTests()
    }
}

module.exports = {
    StageTest: StageTest,
    wrong: CheckResult.wrong,
    correct: CheckResult.correct
}
