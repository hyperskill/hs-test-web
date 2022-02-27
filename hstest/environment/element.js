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
var eventHandler_js_1 = __importDefault(require("../handler/eventHandler.js"));
var puppeteer_element2selector_1 = require("puppeteer-element2selector");
var WrongAnswer_js_1 = __importDefault(require("../exception/outcome/WrongAnswer.js"));
var Element = /** @class */ (function () {
    function Element(elementHandle, selector, parent, page) {
        this.elementHandle = elementHandle;
        this.selector = (0, puppeteer_element2selector_1.element2selector)(elementHandle);
        this.parent = parent;
        this.page = page;
    }
    Element.prototype.syncElementHandleWithDOM = function () {
        return __awaiter(this, void 0, void 0, function () {
            var selector;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.selector];
                    case 1:
                        selector = _a.sent();
                        return [4 /*yield*/, this.page.waitForSelector(selector, { timeout: 3000 }).then(function (element) {
                                if (element)
                                    _this.elementHandle = element;
                            })["catch"](function () {
                                throw new WrongAnswer_js_1["default"]("The element with selector '".concat(selector, "' is detached from the DOM!"));
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // Element properties
    Element.prototype.getAttribute = function (attribute) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.elementHandle.evaluate(function (element, attribute) { return element.getAttribute(attribute); }, attribute)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Element.prototype.getProperty = function (property) {
        return __awaiter(this, void 0, void 0, function () {
            var elementProperty, elementPropertyString;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.elementHandle.getProperty(property)];
                    case 1:
                        elementProperty = _a.sent();
                        return [4 /*yield*/, elementProperty.jsonValue()];
                    case 2:
                        elementPropertyString = (_a.sent());
                        return [2 /*return*/, elementPropertyString.toString().trim()];
                }
            });
        });
    };
    Element.prototype.textContent = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getProperty('textContent')];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Element.prototype.innerHtml = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getProperty('innerHTML')];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Element.prototype.className = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getProperty('className')];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Element.prototype.getStyles = function () {
        return __awaiter(this, void 0, void 0, function () {
            var stylesStr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.elementHandle.evaluate(function (element) { return JSON.stringify(element.style); })];
                    case 1:
                        stylesStr = _a.sent();
                        return [2 /*return*/, JSON.parse(stylesStr)];
                }
            });
        });
    };
    Element.prototype.getComputedStyles = function () {
        return __awaiter(this, void 0, void 0, function () {
            var stylesStr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.elementHandle.evaluate(function (element) { return JSON.stringify(getComputedStyle(element)); })];
                    case 1:
                        stylesStr = _a.sent();
                        return [2 /*return*/, JSON.parse(stylesStr)];
                }
            });
        });
    };
    Element.prototype.select = function (selector) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.syncElementHandleWithDOM()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.elementHandle.$(selector)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Element.prototype.selectAll = function (selector) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.syncElementHandleWithDOM()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.elementHandle.$$(selector)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // Find functions
    Element.prototype.findById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var idSelector;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        idSelector = "#".concat(id);
                        return [4 /*yield*/, this.findBySelector(idSelector)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Element.prototype.findByClassName = function (className) {
        return __awaiter(this, void 0, void 0, function () {
            var classSelector;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        classSelector = ".".concat(className);
                        return [4 /*yield*/, this.findBySelector(classSelector)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Element.prototype.findBySelector = function (selector) {
        return __awaiter(this, void 0, void 0, function () {
            var element, elementWrapper;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.select("".concat(selector))];
                    case 1:
                        element = _a.sent();
                        elementWrapper = new Element(element, selector, this, this.page);
                        if (element === null) {
                            return [2 /*return*/, element];
                        }
                        return [2 /*return*/, elementWrapper];
                }
            });
        });
    };
    Element.prototype.findAllByClassName = function (className) {
        return __awaiter(this, void 0, void 0, function () {
            var classSelector;
            return __generator(this, function (_a) {
                classSelector = ".".concat(className);
                return [2 /*return*/, this.findAllBySelector(classSelector)];
            });
        });
    };
    Element.prototype.findAllBySelector = function (selector) {
        return __awaiter(this, void 0, void 0, function () {
            var elements;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.selectAll("".concat(selector))];
                    case 1:
                        elements = _a.sent();
                        if ((elements === null || elements === void 0 ? void 0 : elements.length) === 0) {
                            return [2 /*return*/, elements];
                        }
                        return [2 /*return*/, elements === null || elements === void 0 ? void 0 : elements.map(function (element) { return new Element(element, selector, _this, _this.page); })];
                }
            });
        });
    };
    Element.prototype.click = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.syncElementHandleWithDOM()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.elementHandle.click()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Element.prototype.inputText = function (text) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.syncElementHandleWithDOM()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.elementHandle.focus()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.page.keyboard.type(text)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Element.prototype.focus = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.syncElementHandleWithDOM()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.elementHandle.focus()];
                }
            });
        });
    };
    Element.prototype.hover = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.syncElementHandleWithDOM()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.elementHandle.hover()];
                }
            });
        });
    };
    Element.prototype.waitForEvent = function (eventName, timeout) {
        if (timeout === void 0) { timeout = 10000; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.syncElementHandleWithDOM()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, eventHandler_js_1["default"].waitForEvent(eventName, this.page, this.elementHandle, timeout)];
                }
            });
        });
    };
    Element.prototype.clickForNavigation = function (option) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.syncElementHandleWithDOM()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, Promise.all([
                                this.page.waitForNavigation(option),
                                this.elementHandle.click()
                            ])];
                }
            });
        });
    };
    return Element;
}());
exports["default"] = Element;
//# sourceMappingURL=element.js.map