class CheckResult {

    constructor(isCorrect, feedback) {
        this.isCorrect = isCorrect;
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
        return object.hasOwnProperty("isCorrect") && object.hasOwnProperty("feedback")
    }
}

module.exports = {
    CheckResult
}
