"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stageTest_js_1 = __importDefault(require("./stageTest.js"));
const reactRunner_js_1 = __importDefault(require("../testing/runner/reactRunner.js"));
const callsite_1 = __importDefault(require("callsite"));
const path_1 = __importDefault(require("path"));
class ReactTest extends stageTest_js_1.default {
    constructor() {
        super();
        this.host = 'localhost';
        this.port = 31328;
        const path = ReactTest.getUserDirPath((0, callsite_1.default)());
        this.runner = new reactRunner_js_1.default(this.host, this.port, path);
    }
    static getUserDirPath(stack) {
        const requester = stack[2].getFileName();
        const path_folders = path_1.default.join(decodeURIComponent(requester)).split(path_1.default.sep);
        return path_folders.slice(1, path_folders.length - 2).join(path_1.default.sep);
    }
    async runTests() {
        const runner = this.runner;
        runner.port = this.port || 31328;
        runner.host = this.host || "localhost";
        await super.runTests();
    }
}
exports.default = ReactTest;
//# sourceMappingURL=reactTest.js.map