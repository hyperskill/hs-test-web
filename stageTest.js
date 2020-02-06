function fatalError(testNumber, message) {
    let whenErrorHappened = testNumber === 0 ? 'during testing' : 'in test #' + testNumber;
    return ('Fatal error ' + whenErrorHappened + 
            ', please send the report to support@hyperskill.org\n\n' + message).trim();
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

function accept() {
    return {
        'type': 'accept'
    };
}

function getPage() {
    return pageToTest;
}

function setPage(page) {
    pageToTest = page;
}

var pageToTest = null;

async function test(...tests) {

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
            result = await currTest();
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

        if (result['type'] !== 'wrong' && result['type'] !== 'accept') {
            return wrong(fatalError(
                testNum,
                'Invalid result. ' + 
                'result["type"] == "' + result['type'] + 
                '", but should be "wrong" or "accept".' 
            ));
        }

        if (result['type'] === 'wrong') {
            return wrong(wrongAnswer(testNum, result['message']));
        }
    }
    return accept();
}

async function testPage(page, ...tests) {
    try {
        pageToTest = page;
        await pageToTest.evaluate(() => {
            this.hs = {
                'accept': () => ({'type': 'accept'}),
                'wrong': (msg) => ({
                    'type': 'wrong',
                    'message': msg == 'string' ? msg.trim() : ''
                })
            }
        });
        for (let i = 0; i < tests.length; i++) {
            tests[i] = async () => await pageToTest.evaluate(tests[i]);
        }
        return await test(...tests);
    } catch (err) {
        return wrong(fatalError(0, err.stack));
    }
}


exports.test = test;
exports.testPage = testPage;
exports.wrong = wrong;
exports.accept = accept;
