class CheckResult {

    constructor(isCorrect, feedback) {
        this.isCorrect = true;
        this.feedback = feedback;
    }

    static correct() {
        console.log('correct is called')
        return new CheckResult(true, '')
    }

    static wrong(message) {
        console.log('wrong is called')
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
