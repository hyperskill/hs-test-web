"use strict";
/* eslint no-use-before-define: 2 */
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
var checkResult_js_1 = __importDefault(require("../outcome/checkResult.js"));
var BrowserPageHandler = /** @class */ (function () {
    function BrowserPageHandler() {
    }
    BrowserPageHandler.initHyperskillContext = function (page) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, page.exposeFunction('correct', checkResult_js_1["default"].correct)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, page.exposeFunction('wrong', checkResult_js_1["default"].wrong)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BrowserPageHandler.initKeyboardEvents = function (page) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, page.evaluate(function () {
                            var unusualCharToCode = {
                                '`': 'Backquote',
                                '-': 'Minus',
                                '=': 'Equal',
                                '[': 'BracketLeft',
                                ']': 'BracketRight',
                                '\\': 'Backslash',
                                ';': 'Semicolon',
                                "'": 'Quote',
                                ',': 'Comma',
                                '.': 'Period',
                                '/': 'Slash',
                                ' ': 'Space'
                            };
                            var unusualCharToScanCode = {
                                '`': 192,
                                '-': 189,
                                '=': 187,
                                '[': 219,
                                ']': 221,
                                '\\': 220,
                                ';': 186,
                                "'": 222,
                                ',': 188,
                                '.': 190,
                                '/': 191
                            };
                            var shiftPairs = {
                                '~': '`',
                                '_': '-',
                                '+': '=',
                                '{': '[',
                                '}': ']',
                                '|': '\\',
                                ':': ';',
                                '"': "'",
                                '<': ',',
                                '>': '.',
                                '?': '/'
                            };
                            var shiftNumbers = {
                                '!': '1',
                                '@': '2',
                                '#': '3',
                                '$': '4',
                                '%': '5',
                                '^': '6',
                                '&': '7',
                                '*': '8',
                                '(': '9',
                                ')': '0'
                            };
                            function charToCode(c) {
                                if (c >= 'a' && c <= 'z' || c >= 'A' && c <= 'Z') {
                                    return 'Key' + c.toUpperCase();
                                }
                                else if (c >= '0' && c <= '9') {
                                    return 'Digit' + c;
                                }
                                else if (shiftNumbers[c]) {
                                    return 'Digit' + shiftNumbers[c];
                                }
                                else if (unusualCharToCode[c]) {
                                    return unusualCharToCode[c];
                                }
                                else if (shiftPairs[c]) {
                                    return unusualCharToCode[shiftPairs[c]];
                                }
                                else {
                                    return null;
                                }
                            }
                            function charToScanCode(c) {
                                if (c >= 'a' && c <= 'z' || c >= 'A' && c <= 'Z' || c == ' ') {
                                    return c.toUpperCase().charCodeAt(0);
                                }
                                else if (shiftNumbers[c]) {
                                    return shiftNumbers[c].charCodeAt(0);
                                }
                                else if (unusualCharToScanCode[c]) {
                                    return unusualCharToScanCode[c];
                                }
                                else if (shiftPairs[c]) {
                                    return unusualCharToScanCode[shiftPairs[c]];
                                }
                                else {
                                    return null;
                                }
                            }
                            function dispatchKeyboardEvent(dest, type, char) {
                                var key = char; // Source char
                                var code = charToCode(char); // Code of the key
                                var keyCode; // Numeric key code of the key
                                var charCode; // Char code of the key
                                if (type === 'keypress') {
                                    keyCode = char.charCodeAt(0);
                                    charCode = keyCode;
                                }
                                else {
                                    keyCode = charToScanCode(char);
                                    charCode = 0;
                                }
                                dest.dispatchEvent(new KeyboardEvent(type, {
                                    'key': key,
                                    'code': code,
                                    'keyCode': keyCode,
                                    'charCode': charCode
                                }));
                            }
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            _this.press = function (key, destination) {
                                if (destination === void 0) { destination = document; }
                                dispatchKeyboardEvent(destination, 'keydown', key);
                                dispatchKeyboardEvent(destination, 'keypress', key);
                                dispatchKeyboardEvent(destination, 'keyup', key);
                            };
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return BrowserPageHandler;
}());
exports["default"] = BrowserPageHandler;
//# sourceMappingURL=browserPageHandler.js.map