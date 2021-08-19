const {Outcome} = require("./outcome.js")

class CompiliationErrorOutcome extends Outcome {
    constructor(testNum, errors) {
        super(testNum, errors.join("\n\n"));
    }

    getType() {
        return "Compilation error"
    }

}

module.exports = {
    CompiliationErrorOutcome
}
