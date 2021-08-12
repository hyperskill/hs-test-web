const {Outcome} = require("./outcome.js")

class WrongAnswerOutcome extends Outcome {

    constructor(testNumber, errorText) {
        super(testNumber, errorText);
    }

    getType() {
        return "Wrong answer"
    }
}

module.exports = {
    WrongAnswerOutcome: WrongAnswerOutcome
}
