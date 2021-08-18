const {Browser} = require("../../chrome/browser.js")

class TestRunner {

    constructor() {
        this.browser = new Browser();
    }

    setUp() {
    }

    tearDown() {
    }

    test(testRun) {

    }
}

module.exports = {
    TestRunner: TestRunner
}
