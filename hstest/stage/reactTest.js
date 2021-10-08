const {StageTest} = require("./stageTest.js")
const {UnexpectedError} = require("../exception/unexpectedError.js")
const callsite = require('callsite');
const path = require('path')

class ReactTest extends StageTest {

    host = 'localhost'
    port = 31328

    constructor(port) {
        super();

        if (port != null) {
            this.port = port
        }

        try {
            const {ReactRunner} = require("../testing/runner/reactRunner.js")
            const stack = callsite(),
                requester = stack[1].getFileName();
            const path_folders = requester.split(path.sep)
            const resultPath = path_folders.splice(0, path_folders.length - 2).join(path.sep)
            this.runner = new ReactRunner(this.host, this.port, resultPath)
        } catch (err) {
            throw new UnexpectedError("Required dependencies are not installed to test React applications", err)
        }
    }
}

module.exports = {
    ReactTest
}
