import TestRunner from "./runner/runner.js";

class TestRun {

    testNum: number;
    testCount: number;
    testCase: Function;
    runner: TestRunner;

    constructor(testNum: number,
                testCount: number,
                testCase: Function,
                runner: TestRunner) {
        this.testNum = testNum;
        this.testCount = testCount;
        this.testCase = testCase;
        this.runner = runner;
    }

    isFirstTest(): boolean {
        return this.testNum === 1;
    }

    isLastTest(): boolean {
        return this.testNum === this.testCount;
    }

    async setUp(): Promise<any> {
        return this.runner.setUp()
    }

    async tearDown(): Promise<any> {
        this.runner.tearDown()
    }

    async test() {
        try {
            return await this.runner.test(this);
        } catch (err) {
            throw err
        }
    }
}

export default TestRun;
