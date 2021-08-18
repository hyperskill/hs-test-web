class CheckResult {

    constructor(correct, feedback) {
        this.correct = correct;
        this.feedback = feedback;
    }

    static correct() {
        return new CheckResult(true, '')
    }

    static wrong(message) {
        return new CheckResult(false, message)
    }

    static isInstance(object) {
        if (!object) {
            return false
        }
        return object.hasOwnProperty("correct") && object.hasOwnProperty("feedback")
    }

    isCorrect() {
        return this.correct;
    }
}

module.exports = {
    CheckResult: CheckResult
}
