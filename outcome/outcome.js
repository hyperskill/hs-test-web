class Outcome {
    constructor(testNumber, errorText) {
        this.testNumber = testNumber
        this.errorText = errorText
    }

    getType() {
        return ""
    }

    toString() {
        const whenErrorHappened = `${this.getType()} ` +
            (this.testNumber === 0 ? " during testing" : ` in test #${this.testNumber}`)
        return `${whenErrorHappened} \n ${this.errorText}`
    }
}

module.exports = {
    Outcome: Outcome
}
