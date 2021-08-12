const {Outcome} = require("./outcome.js")

class UnexpectedErrorOutcome extends Outcome {

    constructor(testNumber, errorText) {
        super(testNumber, errorText);
    }

    getType() {
        return "Unexpected error"
    }
}

module.exports = {
    UnexpectedErrorOutcome: UnexpectedErrorOutcome
}
