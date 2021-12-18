import TestRun from '../testRun.js'
import Browser from "../../chromium/browser";

class TestRunner {

    setUp(): void {
    }

    tearDown(): void {
    }

    async test(testRun: TestRun): Promise<any> {
        throw new Error('Test method is not implemented')
    }
}

export default TestRunner;
