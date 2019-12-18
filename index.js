
function failed(message) {
    let lines = message.split('\n');
    console.log('\n#educational_plugin FAILED + ' + lines[0]);
    for (let i = 1; i < lines.length; i++) {
        console.log('#educational_plugin ' + lines[i]);
    }
}

function passed() {
    console.log('\n#educational_plugin test OK');
}

function fatalError(testNumber, message) {
    let whenErrorHappened;
    if (testNumber == 0) {
        whenErrorHappened = 'during testing';
    } else {
        whenErrorHappened = 'in test #' + testNumber
    }
    return 'Wrong answer ' + whenErrorHappened + '\n\n' + message;
}

function wrongAnswer(testNumber, message) {
    return 'Wrong answer in test #' + testNumber + '\n\n' + message;
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
    for (let testNum = 1; testNum <= tests.length; testNum++) {
        let currTest = tests[testNum - 1];

        if (typeof currTest != 'function') {
            failed(fatalError(
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
            failed(fatalError(err.stack));
            return;
        }

        if (result['type'] != 'string') {
            failed(fatalError(
                'Invalid result type. ' + 
                'Typeof result["type"] == "' + (typeof result['type']) + 
                '", but should be "string".' 
            ));
            return;
        }

        if (result['type'] != 'wrong' && result['type'] != 'accept') {
            failed(fatalError(
                'Invalid result. ' + 
                'result["type"] == "' + result['type'] + 
                '", but should be "wrong" or "accept".' 
            ));
            return;
        }

        if (result['type'] == 'wrong') {
            failed(wrongAnswer(result['message']));
            return;
        }
    }
    passed();
}


exports.test = test;
exports.wrong = wrong;
exports.accept = accept;
