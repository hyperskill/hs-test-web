var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import TestRunner from "./runner.js";
class JsRunner extends TestRunner {
    test(testRun) {
        return __awaiter(this, void 0, void 0, function* () {
            return testRun.testCase();
        });
    }
    setUp() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.browser.launch();
        });
    }
    tearDown() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.browser.close();
        });
    }
}
export default JsRunner;
//# sourceMappingURL=jsRunner.js.map