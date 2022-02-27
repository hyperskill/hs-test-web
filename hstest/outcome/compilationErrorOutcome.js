"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var outcome_js_1 = __importDefault(require("./outcome.js"));
var CompilationErrorOutcome = /** @class */ (function (_super) {
    __extends(CompilationErrorOutcome, _super);
    function CompilationErrorOutcome(testNum, compilationError) {
        var _this = _super.call(this, 0, "") || this;
        for (var _i = 0, _a = compilationError.errors; _i < _a.length; _i++) {
            var error = _a[_i];
            _this.errorText += error.stack + "\n\n";
        }
        return _this;
    }
    CompilationErrorOutcome.prototype.getType = function () {
        return "Compilation error";
    };
    return CompilationErrorOutcome;
}(outcome_js_1["default"]));
exports["default"] = CompilationErrorOutcome;
//# sourceMappingURL=compilationErrorOutcome.js.map