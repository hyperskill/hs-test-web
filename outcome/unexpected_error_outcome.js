const {Outcome} = require("./outcome.js")

class UnexpectedErrorOutcome extends Outcome {

    constructor(testNum, cause) {
        super(testNum, "");
        this.errorText = "We have recorded this bug and will fix it soon.\n\n";

        if (cause.stack) {
            this.errorText += cause.stack.trim();
        }
    }

    getType() {
        return "Unexpected error";
    }
}

module.exports = {
    UnexpectedErrorOutcome
}
