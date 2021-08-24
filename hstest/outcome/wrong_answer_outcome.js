const {Outcome} = require("./outcome.js")

class WrongAnswerOutcome extends Outcome {

    constructor(testNum, ex) {
        super(testNum, ex.feedbackText)
    }

    getType() {
        return "Wrong answer";
    }
}

module.exports = {
    WrongAnswerOutcome
}
