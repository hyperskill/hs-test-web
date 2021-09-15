const {Outcome} = require("./outcome.js")

class ErrorOutcome extends Outcome {

    constructor(testNum, cause) {
        super(testNum, cause.stack);
    }

    getType() {
        return "Error";
    }
}

module.exports = {
    ErrorOutcome
}
