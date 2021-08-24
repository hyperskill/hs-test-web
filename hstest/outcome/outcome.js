const {WrongAnswer} = require("../exception/wrong_answer.js")
const {ExceptionWithFeedback} = require("../exception/exception_with_feedback.js")
const {ErrorWithFeedback} = require("../exception/error_with_feedback.js")
const {UnexpectedError} = require("../exception/unexpected_error.js")
const {CompilationError} = require("../exception/compilation_error.js")

class Outcome {
    constructor(testNumber, errorText) {
        this.testNumber = testNumber
        this.errorText = errorText
    }

    getType() {
        return ""
    }

    toString() {
        let whenErrorHappened = "";
        if (this.testNumber === 0) {
            whenErrorHappened = " during testing";
        } else {
            whenErrorHappened = " in test #" + this.testNumber;
        }

        let result = this.getType() + whenErrorHappened

        if (this.errorText.length !== 0) {
            result += "\n\n" + this.errorText.trim();
        }

        return result.trim();
    }

    static getOutcome(ex, currTest) {
        const {WrongAnswerOutcome} = require("./wrong_answer_outcome.js")
        const {UnexpectedErrorOutcome} = require("./unexpected_error_outcome.js")
        const {ExceptionOutcome} = require("./exception_outcome.js")
        const {ErrorOutcome} = require("./error_outcome.js")
        const {CompiliationErrorOutcome} = require("./compiliation_error_outcome.js")


        if (ex instanceof WrongAnswer) {
            return new WrongAnswerOutcome(currTest, ex)
        } else if (ex instanceof ExceptionWithFeedback) {
            return new ExceptionOutcome(currTest, ex)
        } else if (ex instanceof ErrorWithFeedback) {
            return new ErrorOutcome(currTest, ex)
        } else if (ex.toString().includes("Protocol error")) {
            return new ErrorOutcome(currTest, ex)
        } else if (ex instanceof CompilationError) {
            return new CompiliationErrorOutcome(currTest, ex.errors)
        } else {
            return new UnexpectedErrorOutcome(currTest, ex)
        }
    }
}

module.exports = {
    Outcome: Outcome
}
