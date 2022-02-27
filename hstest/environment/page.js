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
var browserPageHandler_js_1 = __importDefault(require("../handler/browserPageHandler.js"));
var checkResult_js_1 = __importDefault(require("../outcome/checkResult.js"));
var WrongAnswer_js_1 = __importDefault(require("../exception/outcome/WrongAnswer.js"));
var TestPassed_js_1 = __importDefault(require("../exception/outcome/TestPassed.js"));
var element_js_1 = __importDefault(require("./element.js"));
var eventHandler_js_1 = __importDefault(require("../handler/eventHandler.js"));
var Page = /** @class */ (function () {
    function Page(url, browser) {
        this.url = url;
        this.browser = browser;
        this.isOpened = false;
    }
    Page.prototype.open = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.isOpened) {
                            return [2 /*return*/];
                        }
                        _a = this;
                        return [4 /*yield*/, this.browser.newPage()];
                    case 1:
                        _a.pageInstance = _b.sent();
                        return [4 /*yield*/, this.pageInstance.goto(this.url)];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, browserPageHandler_js_1["default"].initHyperskillContext(this.pageInstance)];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, browserPageHandler_js_1["default"].initKeyboardEvents(this.pageInstance)];
                    case 4:
                        _b.sent();
                        this.isOpened = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    Page.prototype.execute = function (func) {
        var _this = this;
        return function () { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.open()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.pageInstance.evaluate(func)];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, checkResult_js_1["default"].fromJson(result)];
                }
            });
        }); };
    };
    Page.prototype.viewport = function () {
        return this.pageInstance.viewport();
    };
    Page.prototype.setViewport = function (viewport) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.pageInstance.setViewport(viewport)];
            });
        });
    };
    Page.prototype.evaluate = function (func) {
        return __awaiter(this, void 0, void 0, function () {
            var evaluationResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.open()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.pageInstance.evaluate(func)];
                    case 2:
                        evaluationResult = _a.sent();
                        if (checkResult_js_1["default"].isCheckResult(evaluationResult)) {
                            if (!evaluationResult.isCorrect) {
                                throw new WrongAnswer_js_1["default"](evaluationResult.feedback);
                            }
                            else {
                                throw new TestPassed_js_1["default"]();
                            }
                        }
                        return [2 /*return*/, evaluationResult];
                }
            });
        });
    };
    Page.prototype._getBodyTag = function () {
        return __awaiter(this, void 0, void 0, function () {
            var bodySelector, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.open()];
                    case 1:
                        _b.sent();
                        bodySelector = 'body';
                        _a = element_js_1["default"].bind;
                        return [4 /*yield*/, this.pageInstance.$(bodySelector)];
                    case 2: return [2 /*return*/, new (_a.apply(element_js_1["default"], [void 0, _b.sent(),
                            bodySelector,
                            null,
                            this.pageInstance]))()];
                }
            });
        });
    };
    Page.prototype.findById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._getBodyTag()];
                    case 1: return [4 /*yield*/, (_a.sent()).findById(id)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Page.prototype.findByClassName = function (className) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._getBodyTag()];
                    case 1: return [4 /*yield*/, (_a.sent()).findByClassName(className)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Page.prototype.findBySelector = function (selector) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._getBodyTag()];
                    case 1: return [4 /*yield*/, (_a.sent()).findBySelector(selector)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Page.prototype.findAllByClassName = function (className) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._getBodyTag()];
                    case 1: return [4 /*yield*/, (_a.sent()).findAllByClassName(className)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Page.prototype.findAllBySelector = function (selector) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._getBodyTag()];
                    case 1: return [4 /*yield*/, (_a.sent()).findAllBySelector(selector)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Page.prototype.navigate = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    return [4 /*yield*/, this.pageInstance.navigate(url)];
                    case 1:
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Page.prototype.refresh = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pageInstance.reload({
                            waitUntil: 'domcontentloaded'
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Page.prototype.currentUrl = function () {
        return this.pageInstance.url();
    };
    Page.prototype.waitForEvent = function (eventName, timeout) {
        if (timeout === void 0) { timeout = 10000; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.open()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, eventHandler_js_1["default"].waitForEvent(eventName, this.pageInstance, null, timeout)];
                }
            });
        });
    };
    Page.prototype.exposeFunction = function (functionName, func) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.open()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.pageInstance.exposeFunction(functionName, func)];
                }
            });
        });
    };
    return Page;
}());
exports["default"] = Page;
//# sourceMappingURL=page.js.map