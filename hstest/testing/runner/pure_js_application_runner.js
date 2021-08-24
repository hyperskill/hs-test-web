const {TestRunner} = require("./runner.js")
const {TestRun} = require("../test_run.js")

class PureJsApplicationRunner extends TestRunner {

    async test(testCase) {
        const result = await testCase();
        return result;
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
