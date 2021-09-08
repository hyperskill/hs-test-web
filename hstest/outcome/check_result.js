class CheckResult {

    constructor(correct, feedback) {
        this.isCorrect = correct;
        this.feedback = feedback;
    }

    static correct() {
        if (!global.isNewTests) {
            return {
                'type': 'correct'
            }
        }
        return new CheckResult(true, '')
    }

    static wrong(message) {
        if (typeof message != 'string') {
            message = '';
        }

        if (!global.isNewTests) {
            return {
                'type': 'wrong',
                'message': message.trim()
            }
        }

        return new CheckResult(false, message)
    }

    static isInstance(object) {
        if (!object) {
            return false
        }
        return object.hasOwnProperty("isCorrect") && object.hasOwnProperty("feedback")
    }

    isCorrect() {
        return this.isCorrect;
    }
}

module.exports = {
    CheckResult: CheckResult
}
