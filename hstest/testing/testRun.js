const {CheckResult} = require('../outcome/checkResult.js')
const {TestPassed} = require('../exception/testPassed.js')

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
        await this.runner.setUp()
    }

    async tearDown() {
        await this.runner.tearDown()
    }

    async test() {
        try {
            return await this.runner.test(this.testCase);
        } catch (err) {
            if (err instanceof TestPassed) {
                return CheckResult.correct()
            }
            throw err
        }
    }
}

module.exports = {
    TestRun: TestRun
}
