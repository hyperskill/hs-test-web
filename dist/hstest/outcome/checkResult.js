"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CheckResult {
    constructor(correct, feedback) {
        this.isCorrect = correct;
        this.feedback = feedback;
    }
    static correct() {
        return new CheckResult(true, '');
    }
    static wrong(message) {
        if (message == null) {
            message = '';
        }
        return new CheckResult(false, message);
    }
    static fromJson(json) {
        if (!CheckResult.isCheckResult(json)) {
            throw new Error("The result of the evaluate() method should be CheckResult instance!");
        }
        if (json.isCorrect) {
            return CheckResult.correct();
        }
        else {
            return CheckResult.wrong(json.feedback);
        }
    }
    static isCheckResult(json) {
        return !(json == null ||
            !Object.prototype.hasOwnProperty.call(json, "isCorrect") ||
            !Object.prototype.hasOwnProperty.call(json, "feedback"));
    }
}
exports.default = CheckResult;
//# sourceMappingURL=checkResult.js.map