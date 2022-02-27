"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.WrongAnswer = exports.wrong = exports.correct = exports.ReactTest = exports.StageTest = void 0;
var stageTest_js_1 = __importDefault(require("./stage/stageTest.js"));
exports.StageTest = stageTest_js_1["default"];
var checkResult_js_1 = __importDefault(require("./outcome/checkResult.js"));
var WrongAnswer_js_1 = __importDefault(require("./exception/outcome/WrongAnswer.js"));
exports.WrongAnswer = WrongAnswer_js_1["default"];
var reactTest_js_1 = __importDefault(require("./stage/reactTest.js"));
exports.ReactTest = reactTest_js_1["default"];
var correct = checkResult_js_1["default"].correct;
exports.correct = correct;
var wrong = checkResult_js_1["default"].wrong;
exports.wrong = wrong;
exports["default"] = stageTest_js_1["default"];
//# sourceMappingURL=index.js.map