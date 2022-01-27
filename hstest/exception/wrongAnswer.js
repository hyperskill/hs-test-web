const {OutcomeError} = require("./outcomeError.js")

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
