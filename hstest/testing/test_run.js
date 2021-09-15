const {CheckResult} = require("../outcome/checkResult.js")

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
        return await this.runner.test(this.testCase);
    }
}

module.exports = {
    TestRun: TestRun
}
