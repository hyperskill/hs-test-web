const failedMessage = '#educational_plugin FAILED + ';
const eduMessage = '#educational_plugin ';

function failed(message) {
    let lines = message.split('\n');
    console.log('\n' + failedMessage + lines[0]);
    for (let i = 1; i < lines.length; i++) {
        console.log(eduMessage + lines[i]);
    }
}

function passed() {
    console.log('\n' + eduMessage + 'test OK');
}

function filterLine(line) {
    if (line.startsWith(failedMessage)) {
        return line.substring(failedMessage.length);
    }
    if (line.startsWith(eduMessage)) {
        return line.substring(eduMessage.length);
    }
    return line;
}

function filter(message) {
    message = message.replace("\n" + failedMessage, '');
    message = message.replace("\n" + eduMessage + "test OK", 'test OK');

    while (message.includes(eduMessage)) {
        message = message.replace(eduMessage, '');
    }

    return message;
}

exports.failed = failed
exports.passed = passed
exports.filter = filter
