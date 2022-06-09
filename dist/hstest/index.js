"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WrongAnswer = exports.wrong = exports.correct = exports.ReactTest = exports.StageTest = void 0;
const stageTest_js_1 = __importDefault(require("./stage/stageTest.js"));
exports.StageTest = stageTest_js_1.default;
const checkResult_js_1 = __importDefault(require("./outcome/checkResult.js"));
const WrongAnswer_js_1 = __importDefault(require("./exception/outcome/WrongAnswer.js"));
exports.WrongAnswer = WrongAnswer_js_1.default;
const reactTest_js_1 = __importDefault(require("./stage/reactTest.js"));
exports.ReactTest = reactTest_js_1.default;
const correct = checkResult_js_1.default.correct;
exports.correct = correct;
const wrong = checkResult_js_1.default.wrong;
exports.wrong = wrong;
exports.default = stageTest_js_1.default;
//# sourceMappingURL=index.js.map