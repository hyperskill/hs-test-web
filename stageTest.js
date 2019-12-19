let logger = require('./logger');

function fatalError(testNumber, message) {
    let whenErrorHappened;
    if (testNumber == 0) {
        whenErrorHappened = 'during testing';
    } else {
        whenErrorHappened = 'in test #' + testNumber
    }
    return ('Fatal error ' + whenErrorHappened + '\n\n' + message).trim();
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
        'message': message
    }
}

function accept() {
    return {
        'type': 'accept'
    };
}

function test(...tests) {

    if (tests.length == 0) {
        logger.failed(fatalError(
            0, 'Cannot find tests.' 
        ));
        return;
    }

    for (let testNum = 1; testNum <= tests.length; testNum++) {
        let currTest = tests[testNum - 1];

        if (typeof currTest != 'function') {
            logger.failed(fatalError(
                testNum,
                'Invalid test. ' + 
                'Typeof testCase == "' + (typeof currTest) + 
                '", but should be "function".' 
            ));
            return;
        }
        
        let result;
        try {
            result = currTest();
        } catch (err) {
            logger.failed(fatalError(testNum, err.stack));
            return;
        }

        if (typeof result != 'object') {
            logger.failed(fatalError(
                testNum,
                'Invalid result type. ' + 
                'Typeof result == "' + (typeof result) + 
                '", but should be "object".' 
            ));
            return;
        }

        if (typeof result['type'] != 'string') {
            logger.failed(fatalError(
                testNum,
                'Invalid result type. ' + 
                'Typeof result["type"] == "' + (typeof result['type']) + 
                '", but should be "string".' 
            ));
            return;
        }

        if (result['type'] != 'wrong' && result['type'] != 'accept') {
            logger.failed(fatalError(
                testNum,
                'Invalid result. ' + 
                'result["type"] == "' + result['type'] + 
                '", but should be "wrong" or "accept".' 
            ));
            return;
        }

        if (result['type'] == 'wrong') {
            logger.failed(wrongAnswer(testNum, result['message']));
            return;
        }
    }
    logger.passed();
}


exports.test = test;
exports.wrong = wrong;
exports.accept = accept;
