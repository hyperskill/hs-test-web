"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var WrongAnswer_js_1 = __importDefault(require("../exception/outcome/WrongAnswer.js"));
var wrongAnswerOutcome_js_1 = __importDefault(require("./wrongAnswerOutcome.js"));
var unexpectedErrorOutcome_js_1 = __importDefault(require("./unexpectedErrorOutcome.js"));
var CompilationError_js_1 = __importDefault(require("../exception/outcome/CompilationError.js"));
var compilationErrorOutcome_js_1 = __importDefault(require("./compilationErrorOutcome.js"));
var errorOutcome_js_1 = __importDefault(require("./errorOutcome.js"));
var OutcomeFactory = /** @class */ (function () {
    function OutcomeFactory() {
    }
    OutcomeFactory.getOutcome = function (ex, currTest) {
        if (ex instanceof WrongAnswer_js_1["default"]) {
            return new wrongAnswerOutcome_js_1["default"](currTest, ex);
        }
        else if (ex instanceof CompilationError_js_1["default"]) {
            return new compilationErrorOutcome_js_1["default"](currTest, ex);
        }
        else if (ex.toString().toLowerCase().includes("protocol error")
            || ex.toString().toLowerCase().includes("context was destroyed")
            || ex.toString().toLowerCase().includes("chromium revision is not downloaded")) {
            return new errorOutcome_js_1["default"](currTest, ex);
        }
        else {
            return new unexpectedErrorOutcome_js_1["default"](currTest, ex);
        }
    };
    return OutcomeFactory;
}());
exports["default"] = OutcomeFactory;
//# sourceMappingURL=outcomeFactory.js.map