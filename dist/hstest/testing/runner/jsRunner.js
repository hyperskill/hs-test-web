"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const runner_js_1 = __importDefault(require("./runner.js"));
class JsRunner extends runner_js_1.default {
    async test(testRun) {
        return testRun.testCase();
    }
    async setUp() {
        await this.browser.launch();
    }
    async tearDown() {
        await this.browser.close();
    }
}
exports.default = JsRunner;
//# sourceMappingURL=jsRunner.js.map