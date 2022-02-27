"use strict";
exports.__esModule = true;
var CheckResult = /** @class */ (function () {
    function CheckResult(correct, feedback) {
        this.isCorrect = correct;
        this.feedback = feedback;
    }
    CheckResult.correct = function () {
        return new CheckResult(true, '');
    };
    CheckResult.wrong = function (message) {
        if (message == null) {
            message = '';
        }
        return new CheckResult(false, message);
    };
    CheckResult.fromJson = function (json) {
        if (!CheckResult.isCheckResult(json)) {
            throw new Error("The result of the evaluate() method should be CheckResult instance!");
        }
        if (json.isCorrect) {
            return CheckResult.correct();
        }
        else {
            return CheckResult.wrong(json.feedback);
        }
    };
    CheckResult.isCheckResult = function (json) {
        return !(json == null ||
            !Object.prototype.hasOwnProperty.call(json, "isCorrect") ||
            !Object.prototype.hasOwnProperty.call(json, "feedback"));
    };
    return CheckResult;
}());
exports["default"] = CheckResult;
//# sourceMappingURL=checkResult.js.map