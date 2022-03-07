"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TestPassed_js_1 = __importDefault(require("../exception/outcome/TestPassed.js"));
const checkResult_js_1 = __importDefault(require("../outcome/checkResult.js"));
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
        return this.runner.setUp();
    }
    async tearDown() {
        this.runner.tearDown();
    }
    async test() {
        try {
            return await this.runner.test(this);
        }
        catch (err) {
            if (err instanceof TestPassed_js_1.default) {
                return checkResult_js_1.default.correct();
            }
            throw err;
        }
    }
}
exports.default = TestRun;
//# sourceMappingURL=testRun.js.map