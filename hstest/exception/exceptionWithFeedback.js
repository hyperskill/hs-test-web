const {OutcomeError} = require("./outcomeError.js")

class ExceptionWithFeedback extends OutcomeError {
    constructor(errorText, cause) {
        super(errorText);
        this.errorText = errorText;
        this.cause = cause;
    }
}

module.exports = {
    ExceptionWithFeedback
}
