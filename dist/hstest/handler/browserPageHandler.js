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
import CheckResult from "../outcome/checkResult.js";
class BrowserPageHandler {
    static initHyperskillContext(page) {
        return __awaiter(this, void 0, void 0, function* () {
            yield page.evaluate((CheckResultString) => {
                eval(`window.CheckResult = ${CheckResultString}`);
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                this.wrong = CheckResult.wrong;
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                this.correct = CheckResult.correct;
            }, CheckResult.toString());
        });
    }
    static initKeyboardEvents(page) {
        return __awaiter(this, void 0, void 0, function* () {
            yield page.evaluate(() => {
                const unusualCharToCode = {
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
                    ' ': 'Space',
                };
                const unusualCharToScanCode = {
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
                    '/': 191,
                };
                const shiftPairs = {
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
                    '?': '/',
                };
                const shiftNumbers = {
                    '!': '1',
                    '@': '2',
                    '#': '3',
                    '$': '4',
                    '%': '5',
                    '^': '6',
                    '&': '7',
                    '*': '8',
                    '(': '9',
                    ')': '0',
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
                    const key = char; // Source char
                    const code = charToCode(char); // Code of the key
                    let keyCode; // Numeric key code of the key
                    let charCode; // Char code of the key
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
                        'charCode': charCode,
                    }));
                }
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                this.press = function (key, destination = document) {
                    dispatchKeyboardEvent(destination, 'keydown', key);
                    dispatchKeyboardEvent(destination, 'keypress', key);
                    dispatchKeyboardEvent(destination, 'keyup', key);
                };
            });
        });
    }
}
export default BrowserPageHandler;
//# sourceMappingURL=browserPageHandler.js.map