const {OutcomeError} = require("./outcome_error.js")

class WrongAnswer extends OutcomeError {

    constructor(feedbackText) {
        super();
        this.feedbackText = feedbackText;
    }

    getFeedBackText() {
        return this.feedbackText;
    }
}

module.exports = {
    WrongAnswer
}
