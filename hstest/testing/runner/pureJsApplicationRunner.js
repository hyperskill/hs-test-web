const {TestRunner} = require("./runner.js")

class PureJsApplicationRunner extends TestRunner {

    async test(testCase) {
        return await testCase();
    }

    async setUp() {
        await this.browser.launch();
    }

    async tearDown() {
        await this.browser.close();
    }
}

module.exports = {
    PureJsApplicationRunner: PureJsApplicationRunner
}
