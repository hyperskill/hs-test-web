const {OutcomeError} = require("./outcome_error.js")

class ErrorWithFeedback extends OutcomeError {
    constructor(errorText, cause) {
        super(errorText);
        this.errorText = errorText;
        this.cause = cause;
    }
}

module.exports = {
    ErrorWithFeedback
}
