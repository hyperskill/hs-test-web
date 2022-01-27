const {WrongAnswer} = require("../exception/wrongAnswer.js")
const {ExceptionWithFeedback} = require("../exception/exceptionWithFeedback.js")
const {ErrorWithFeedback} = require("../exception/errorWithFeedback.js")
const {CompilationError} = require("../exception/compilationError.js")

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
        } else if (this.testNumber > 0) {
            whenErrorHappened = " in test #" + this.testNumber;
        }

        let result = this.getType() + whenErrorHappened

        if (this.errorText.length !== 0) {
            result += "\n\n" + this.errorText.trim();
        }

        return result.trim();
    }

    static getOutcome(ex, currTest) {
        const {WrongAnswerOutcome} = require("./wrongAnswerOutcome.js")
        const {UnexpectedErrorOutcome} = require("./unexpectedErrorOutcome.js")
        const {ExceptionOutcome} = require("./exceptionOutcome.js")
        const {ErrorOutcome} = require("./errorOutcome.js")
        const {CompilationErrorOutcome} = require("./compilationErrorOutcome.js")


        if (ex instanceof WrongAnswer) {
            return new WrongAnswerOutcome(currTest, ex)
        } else if (ex instanceof ExceptionWithFeedback) {
            return new ExceptionOutcome(currTest, ex)
        } else if (ex instanceof ErrorWithFeedback) {
            return new ErrorOutcome(currTest, ex)
        } else if (ex.toString().toLowerCase().includes("protocol error")
            || ex.toString().toLowerCase().includes("context was destroyed")
            || ex.toString().toLowerCase().includes("chromium revision is not downloaded")) {
            return new ErrorOutcome(currTest, ex)
        } else if (ex instanceof CompilationError) {
            return new CompilationErrorOutcome(currTest, ex.errors)
        } else {
            return new UnexpectedErrorOutcome(currTest, ex)
        }
    }
}

module.exports = {
    Outcome: Outcome
}
