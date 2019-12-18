let failedMessage = '#educational_plugin FAILED + ';
let eduMessage = '#educational_plugin ';

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

function disableEduToolsMessages() {
    failedMessage = '';
    eduMessage = '';
}

exports.failed = failed
exports.passed = passed
exports.disableEduToolsMessages = disableEduToolsMessages
