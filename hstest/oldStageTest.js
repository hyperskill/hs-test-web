function fatalError(testNumber, message) {
    let whenErrorHappened = testNumber === 0 ? 'during testing' : 'in test #' + testNumber;
    return ('Unexpected error ' + whenErrorHappened + '\n\n' + message).trim();
}

function wrongAnswer(testNumber, message) {
    return ('Wrong answer in test #' + testNumber + '\n\n' + message).trim();
}

function wrong(message) {
    if (typeof message != 'string') {
        message = '';
    }
    return {
        'type': 'wrong',
        'message': message.trim()
    }
}

function correct() {
    return {
        'type': 'correct'
    };
}

async function initHsObjectInBrowser(page) {
    await page.evaluate(() => {
        this.hs = {
            'correct': () => ({'type': 'correct'}),
            'wrong': (msg) => ({
                'type': 'wrong',
                'message': typeof msg == 'string' ? msg.trim() : ''
            })
        }

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

        this.hs.press = function (key, destination = document) {
            dispatchKeyboardEvent(destination, 'keydown', key);
            dispatchKeyboardEvent(destination, 'keypress', key);
            dispatchKeyboardEvent(destination, 'keyup', key);
        }
    });
}

function onPage(page, test) {
    return async () => {
        try {
            await initHsObjectInBrowser(page);
        } catch (err) {
            return wrong(fatalError(0, err.stack));
        }
        return await page.evaluate(test)
    }
}

async function test(...tests) {
    return baseTest(null, ...tests)
}

async function testPage(page, ...tests) {
    return baseTest(page, ...tests)
}

async function baseTest(page = null, ...tests) {

    global.isNewTests = false

    if (page !== null) {
        try {
            await initHsObjectInBrowser(page)
        } catch (err) {
            return wrong(fatalError(0, err.stack));
        }
    }

    if (tests.length === 0) {
        return wrong(fatalError(
            0, 'Cannot find tests.'
        ));
    }

    for (let testNum = 1; testNum <= tests.length; testNum++) {
        let currTest = tests[testNum - 1];

        if (typeof currTest != 'function') {
            return wrong(fatalError(
                testNum,
                'Invalid test. ' +
                'Typeof testCase == "' + (typeof currTest) +
                '", but should be "function".'
            ));
        }

        let result;
        try {
            if (page == null) {
                result = await currTest()
            } else {
                result = await page.evaluate(currTest);
            }
        } catch (err) {
            return wrong(fatalError(testNum, err.stack));
        }

        if (typeof result != 'object') {
            return wrong(fatalError(
                testNum,
                'Invalid result type. ' +
                'Typeof result == "' + (typeof result) +
                '", but should be "object".'
            ));
        }

        if (typeof result['type'] != 'string') {
            return wrong(fatalError(
                testNum,
                'Invalid result type. ' +
                'Typeof result["type"] == "' + (typeof result['type']) +
                '", but should be "string".'
            ));
        }

        if (result['type'] !== 'wrong' && result['type'] !== 'correct') {
            return wrong(fatalError(
                testNum,
                'Invalid result. ' +
                'result["type"] == "' + result['type'] +
                '", but should be "wrong" or "correct".'
            ));
        }

        if (result['type'] === 'wrong') {
            return wrong(wrongAnswer(testNum, result['message']));
        }
    }
    return correct();
}

exports.test = test;
exports.testPage = testPage;
exports.onPage = onPage;
