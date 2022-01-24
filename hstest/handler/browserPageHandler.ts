import puppeteer from 'puppeteer'
import CheckResult from "../outcome/checkResult.js";

class BrowserPageHandler {
    static async initHyperskillContext(page: puppeteer.Page) {
        await page.evaluate((CheckResultString) => {
            eval(`window.CheckResult = ${CheckResultString}`);

            // @ts-ignore
            this.wrong = CheckResult.wrong;
            // @ts-ignore
            this.correct = CheckResult.correct;
        }, CheckResult.toString())
    }

    // @ts-ignore
    static async initKeyboardEvents(page: puppeteer.Page) {
        await page.evaluate(() => {
            let unusualCharToCode: any = {
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
            }

            let unusualCharToScanCode: any = {
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
            }

            let shiftPairs: any = {
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
            }

            let shiftNumbers: any = {
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
            }

            function charToCode(c: any) {
                if (c >= 'a' && c <= 'z' || c >= 'A' && c <= 'Z') {
                    return 'Key' + c.toUpperCase();

                } else if (c >= '0' && c <= '9') {
                    return 'Digit' + c;

                } else if (shiftNumbers[c]) {
                    return 'Digit' + shiftNumbers[c]

                } else if (unusualCharToCode[c]) {
                    return unusualCharToCode[c];

                } else if (shiftPairs[c]) {
                    return unusualCharToCode[shiftPairs[c]];

                } else {
                    return null;
                }
            }

            // @ts-ignore
            function charToScanCode(c) {
                if (c >= 'a' && c <= 'z' || c >= 'A' && c <= 'Z' || c == ' ') {
                    return c.toUpperCase().charCodeAt(0);

                } else if (shiftNumbers[c]) {
                    return shiftNumbers[c].charCodeAt(0);

                } else if (unusualCharToScanCode[c]) {
                    return unusualCharToScanCode[c];

                } else if (shiftPairs[c]) {
                    return unusualCharToScanCode[shiftPairs[c]];

                } else {
                    return null;
                }
            }

            // @ts-ignore
            function dispatchKeyboardEvent(dest, type, char) {
                let key = char;              // Source char
                let code = charToCode(char); // Code of the key
                let keyCode;                 // Numeric key code of the key
                let charCode;                // Char code of the key

                if (type === 'keypress') {
                    keyCode = char.charCodeAt(0);
                    charCode = keyCode;
                } else {
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

            // @ts-ignore
            this.press = function (key, destination = document) {
                dispatchKeyboardEvent(destination, 'keydown', key);
                dispatchKeyboardEvent(destination, 'keypress', key);
                dispatchKeyboardEvent(destination, 'keyup', key);
            }
        });
    }
}

export default BrowserPageHandler;