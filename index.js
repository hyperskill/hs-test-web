const fs = require("fs");

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

function test(...tests) {
    let isFailed = false;
    for (let testNum = 0; testNum < tests.length; testNum++) {
        let currTest = tests[testNum];
        let file = fs.readFileSync(currTest, 'utf8');
        file = file.trim();
        if (file.length === 0) {
            let message = 'Wrong answer in test #' + (testNum + 1);
            message += '\n\nFile ' + currTest + ' should not be empty!'
            failed(message);
            isFailed = true;
            break;
        }
    }
    if (!isFailed) {
        passed();
    }
}


exports.test = test;
