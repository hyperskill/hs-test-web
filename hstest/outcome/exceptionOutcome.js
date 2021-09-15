const {Outcome} = require("./outcome.js")

class ExceptionOutcome extends Outcome {

    constructor(testNum, ex) {
        super(testNum, ex.stack.trim());
    }

    getType() {
        return "Exception";
    }
}

module.exports = {
    ExceptionOutcome
}
