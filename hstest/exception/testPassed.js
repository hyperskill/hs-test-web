const {OutcomeError} = require("./outcomeError.js")

class TestPassed extends OutcomeError {

    constructor() {
        super();
    }

}

module.exports = {
    TestPassed
}
