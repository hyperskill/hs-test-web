
function failed(message) {
    let lines = message.split('\n');
    console.log('\n#educational_plugin FAILED + ' + lines[0]);
    for (let i = 1; i < lines.length; i++) {
        console.log(lines[i]);
    }
}

function passed() {
    console.log('\n#educational_plugin test OK');
}


exports.failed = failed;
exports.passed = passed;
