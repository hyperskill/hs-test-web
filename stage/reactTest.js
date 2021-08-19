const {StageTest} = require("./stageTest.js")
const {ReactRunner} = require("../testing/runner/react_runner.js")

class ReactTest extends StageTest {

    constructor(host, port, dirPath) {
        super();
        this.runner = new ReactRunner(host, port, dirPath)
    }
}

module.exports = {
    ReactTest
}
