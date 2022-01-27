const {Outcome} = require("./outcome.js")

class CompilationErrorOutcome extends Outcome {
    constructor(testNum, errors) {
        super(testNum, errors.join("\n\n"));
        this.testNumber = -1
    }

    getType() {
        return "Compilation error"
    }

}

module.exports = {
    CompilationErrorOutcome
}
