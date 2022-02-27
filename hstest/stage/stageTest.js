"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var node_js_1 = __importDefault(require("../environment/node.js"));
var testRun_js_1 = __importDefault(require("../testing/testRun.js"));
var jsRunner_js_1 = __importDefault(require("../testing/runner/jsRunner.js"));
var checkResult_js_1 = __importDefault(require("../outcome/checkResult.js"));
var page_js_1 = __importDefault(require("../environment/page.js"));
var UnexpectedError_js_1 = __importDefault(require("../exception/outcome/UnexpectedError.js"));
var outcomeFactory_js_1 = __importDefault(require("../outcome/outcomeFactory.js"));
var WrongAnswer_js_1 = __importDefault(require("../exception/outcome/WrongAnswer.js"));
var unexpectedErrorOutcome_js_1 = __importDefault(require("../outcome/unexpectedErrorOutcome.js"));
var StageTest = /** @class */ (function () {
    function StageTest() {
        this.node = new node_js_1["default"]();
        this.runner = new jsRunner_js_1["default"]();
        this.tests = [];
    }
    StageTest.prototype.getPage = function (url) {
        return new page_js_1["default"](url, this.runner.browser);
    };
    StageTest.prototype.printTestNum = function (testNum) {
        console.log("\x1b[1;31m" + "Start test " + testNum + "\x1b[0m");
    };
    StageTest.prototype.runTests = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._runTests()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    StageTest.prototype.initTests = function () {
        return __awaiter(this, void 0, void 0, function () {
            var testCount, testRuns, i, currTest, testCase;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        testCount = this.tests.length;
                        if (testCount === 0) {
                            throw new UnexpectedError_js_1["default"]("No tests found!");
                        }
                        testRuns = [];
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < this.tests.length)) return [3 /*break*/, 4];
                        currTest = i + 1;
                        return [4 /*yield*/, this.tests[i]];
                    case 2:
                        testCase = _a.sent();
                        if (!(testCase instanceof Function)) {
                            throw new UnexpectedError_js_1["default"]("Found a wrong test case that is not a function");
                        }
                        testRuns.push(new testRun_js_1["default"](currTest, testCount, testCase, this.runner));
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, testRuns];
                }
            });
        });
    };
    StageTest.prototype._runTests = function () {
        return __awaiter(this, void 0, void 0, function () {
            var currTest, testRuns, i, testRun, result, err_1, outcome, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        currTest = 0;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 9, 10, 14]);
                        return [4 /*yield*/, this.initTests()];
                    case 2:
                        testRuns = _a.sent();
                        i = 0;
                        _a.label = 3;
                    case 3:
                        if (!(i < testRuns.length)) return [3 /*break*/, 8];
                        testRun = testRuns[i];
                        currTest++;
                        this.printTestNum(currTest);
                        if (!testRun.isFirstTest()) return [3 /*break*/, 5];
                        return [4 /*yield*/, testRun.setUp()];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [4 /*yield*/, testRun.test()];
                    case 6:
                        result = _a.sent();
                        if (!(result instanceof checkResult_js_1["default"])) {
                            throw new UnexpectedError_js_1["default"]('Expected CheckResult instance as a result of the test case');
                        }
                        if (!result.isCorrect) {
                            throw new WrongAnswer_js_1["default"](result.feedback);
                        }
                        _a.label = 7;
                    case 7:
                        i++;
                        return [3 /*break*/, 3];
                    case 8: return [3 /*break*/, 14];
                    case 9:
                        err_1 = _a.sent();
                        outcome = void 0;
                        try {
                            outcome = outcomeFactory_js_1["default"].getOutcome(err_1, currTest);
                        }
                        catch (err) {
                            throw new Error(new unexpectedErrorOutcome_js_1["default"](currTest, err).toString());
                        }
                        throw new Error(outcome.toString());
                    case 10:
                        _a.trys.push([10, 12, , 13]);
                        return [4 /*yield*/, this.runner.tearDown()];
                    case 11:
                        _a.sent();
                        return [3 /*break*/, 13];
                    case 12:
                        err_2 = _a.sent();
                        throw new Error(new unexpectedErrorOutcome_js_1["default"](currTest, err_2).toString());
                    case 13: return [7 /*endfinally*/];
                    case 14: return [2 /*return*/];
                }
            });
        });
    };
    return StageTest;
}());
exports["default"] = StageTest;
//# sourceMappingURL=stageTest.js.map