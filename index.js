
let called = 0;

function printMsg() {
    called++;
    console.log('Demo tests created. Called: ' + called + ' times');
}

exports.printMsg = printMsg;
