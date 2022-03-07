"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Outcome {
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
exports.default = Outcome;
//# sourceMappingURL=outcome.js.map