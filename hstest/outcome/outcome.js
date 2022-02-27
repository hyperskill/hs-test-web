"use strict";
exports.__esModule = true;
var Outcome = /** @class */ (function () {
    function Outcome(testNumber, errorText) {
        this.testNumber = testNumber;
        this.errorText = errorText;
    }
    Outcome.prototype.getType = function () {
        return "";
    };
    Outcome.prototype.toString = function () {
        var whenErrorHappened = "";
        if (this.testNumber === 0) {
            whenErrorHappened = " during testing";
        }
        else if (this.testNumber > 0) {
            whenErrorHappened = " in test #" + this.testNumber;
        }
        var result = this.getType() + whenErrorHappened;
        if (this.errorText.length !== 0) {
            result += "\n\n" + this.errorText.trim();
        }
        return result.trim();
    };
    return Outcome;
}());
exports["default"] = Outcome;
//# sourceMappingURL=outcome.js.map