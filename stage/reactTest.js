const {StageTest} = require("./stageTest.js")
const {UnexpectedError} = require("../exception/unexpected_error.js")

class ReactTest extends StageTest {

    constructor(host, port, dirPath) {
        super();
        try {
            const {ReactRunner} = require("../testing/runner/react_runner.js")
            this.runner = new ReactRunner(host, port, dirPath)
        } catch (err) {
            throw new UnexpectedError("Required dependencies are not installed to test React applications", err)
        }
    }
}

module.exports = {
    ReactTest
}
