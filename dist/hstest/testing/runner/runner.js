"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const browser_js_1 = __importDefault(require("../../chromium/browser.js"));
class TestRunner {
    constructor() {
        this.browser = new browser_js_1.default();
    }
    setUp() {
    }
    tearDown() {
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async test(testRun) {
        throw new Error('Test method is not implemented');
    }
}
exports.default = TestRunner;
//# sourceMappingURL=runner.js.map