const {CheckResult} = require("../outcome/checkResult.js")
const {PureJsApplicationRunner} = require("../testing/runner/pureJsApplicationRunner.js")
const {TestRun} = require("../testing/testRun.js")
const {Page} = require("../environment/page.js")
const {NodeEnvironment} = require("../environment/node.js")
const {UnexpectedError} = require("../exception/unexpectedError.js")
const {WrongAnswer} = require("../exception/wrongAnswer.js")
const {Outcome} = require("../outcome/outcome.js")
const {OutcomeError} = require('../exception/outcomeError')

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

                if (result === undefined ||
                    result === null ||
                    !result.hasOwnProperty('isCorrect') ||
                    !result.hasOwnProperty('feedback')) {
                    throw new UnexpectedError('Expected CheckResult instance as a result of the test case')
                }

                if (!result.isCorrect) {
                    throw new WrongAnswer(result.feedback)
                }

                if (testRun.isLastTest()) {
                    needTearDown = false
                }
            }
        } catch (err) {
            const outcome = Outcome.getOutcome(err, currTest);
            throw new OutcomeError(outcome.toString())
        } finally {
            try {
                await this.runner.tearDown()
            } catch (err) {
            }
        }
    }

    async runTests() {
        global.isNewTests = true
        await this._runTests()
    }
}

module.exports = {
    StageTest: StageTest,
    wrong: CheckResult.wrong,
    correct: CheckResult.correct
}
