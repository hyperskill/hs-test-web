const {CheckResult} = require("../outcome/checkResult.js")
const {Element} = require("./element.js")
const {WrongAnswer} = require("../exception/wrongAnswer.js")
const {TestPassed} = require("../exception/testPassed.js")


class Page {

    constructor(url, browser) {
        this.url = url;
        this.browser = browser;
        this.isOppened = false;
        this.pageInstance = null;
    }

    async evaluate(func) {
        const evaluationResult = await this.execute(func)()
        if (evaluationResult !== undefined &&
            evaluationResult !== null &&
            evaluationResult.hasOwnProperty('isCorrect') &&
            evaluationResult.hasOwnProperty('feedback')) {
            if (!evaluationResult.isCorrect) {
                throw new WrongAnswer(evaluationResult.feedback)
            } else {
                throw new TestPassed()
            }
        }
        return evaluationResult
    }

    execute(func) {
        return async () => {
            await this.open();
            return await this.pageInstance.evaluate(func)
        }
    }

    async open() {

        if (!this.isOppened) {
            this.pageInstance = await this.browser.newPage();
            await this.pageInstance.goto(this.url)
        }

        await this.pageInstance.evaluate((CheckResultString, isNewTests) => {
            eval(`window.CheckResult = ${CheckResultString}`);

            let unusualCharToCode = {
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

            let unusualCharToScanCode = {
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

            let shiftPairs = {
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

            let shiftNumbers = {
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

            function charToCode(c) {
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

            this.press = function (key, destination = document) {
                dispatchKeyboardEvent(destination, 'keydown', key);
                dispatchKeyboardEvent(destination, 'keypress', key);
                dispatchKeyboardEvent(destination, 'keyup', key);
            }

            this.global = {
                isNewTests: isNewTests
            }
            this.wrong = CheckResult.wrong;
            this.correct = CheckResult.correct;

        }, CheckResult.toString(), global.isNewTests)
        this.isOppened = true
    }

    async _getBodyTag() {
        await this.open()
        const bodySelector = 'body'
        return new Element(
            await this.pageInstance.$(bodySelector),
            bodySelector,
            null,
            this.pageInstance
        );
    }

    async findById(id) {
        return await (await this._getBodyTag()).findById(id)
    }

    async findByClassName(className) {
        return await (await this._getBodyTag()).findByClassName(className)
    }

    async findBySelector(selector) {
        return await (await this._getBodyTag()).findBySelector(selector)
    }

    async findAllByClassName(className) {
        return await (await this._getBodyTag()).findAllByClassName(className)
    }

    async findAllBySelector(selector) {
        return await (await this._getBodyTag()).findAllBySelector(selector)
    }

    async navigate(url) {
        await this.pageInstance.navigate(url)
    }

    async refresh() {
        await this.pageInstance.reload({
            waitUntil: 'domcontentloaded'
        })
    }

    url() {
        return this.pageInstance.url()
    }
}

module.exports = {
    Page: Page
}
