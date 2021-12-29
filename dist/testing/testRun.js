var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import TestPassed from "../exception/outcome/TestPassed.js";
import CheckResult from "../outcome/checkResult.js";
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
    setUp() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.runner.setUp();
        });
    }
    tearDown() {
        return __awaiter(this, void 0, void 0, function* () {
            this.runner.tearDown();
        });
    }
    test() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.runner.test(this);
            }
            catch (err) {
                if (err instanceof TestPassed) {
                    return CheckResult.correct();
                }
                throw err;
            }
        });
    }
}
export default TestRun;
//# sourceMappingURL=testRun.js.map