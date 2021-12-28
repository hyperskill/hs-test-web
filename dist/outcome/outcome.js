export default class Outcome {
    constructor(testNumber, errorText) {
        this.testNumber = testNumber;
        this.errorText = errorText;
    }
    getType() {
        return "";
    }
    toString() {
        let whenErrorHappened = "";
        if (this.testNumber === 0) {
            whenErrorHappened = " during testing";
        }
        else if (this.testNumber > 0) {
            whenErrorHappened = " in test #" + this.testNumber;
        }
        let result = this.getType() + whenErrorHappened;
        if (this.errorText.length !== 0) {
            result += "\n\n" + this.errorText.trim();
        }
        return result.trim();
    }
}
//# sourceMappingURL=outcome.js.map