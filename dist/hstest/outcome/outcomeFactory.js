"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const WrongAnswer_js_1 = __importDefault(require("../exception/outcome/WrongAnswer.js"));
const wrongAnswerOutcome_js_1 = __importDefault(require("./wrongAnswerOutcome.js"));
const unexpectedErrorOutcome_js_1 = __importDefault(require("./unexpectedErrorOutcome.js"));
const CompilationError_js_1 = __importDefault(require("../exception/outcome/CompilationError.js"));
const compilationErrorOutcome_js_1 = __importDefault(require("./compilationErrorOutcome.js"));
const errorOutcome_js_1 = __importDefault(require("./errorOutcome.js"));
class OutcomeFactory {
    static getOutcome(ex, currTest) {
        if (ex instanceof WrongAnswer_js_1.default) {
            return new wrongAnswerOutcome_js_1.default(currTest, ex);
        }
        else if (ex instanceof CompilationError_js_1.default) {
            return new compilationErrorOutcome_js_1.default(currTest, ex);
        }
        else if (ex.toString().toLowerCase().includes("protocol error")
            || ex.toString().toLowerCase().includes("chromium revision is not downloaded")) {
            return new errorOutcome_js_1.default(currTest, ex);
        }
        else if (ex.toString().toLowerCase().includes("context was destroyed")) {
            return new wrongAnswerOutcome_js_1.default(currTest, new WrongAnswer_js_1.default("The page has been reloaded or navigated, but it should not"));
        }
        else {
            return new unexpectedErrorOutcome_js_1.default(currTest, ex);
        }
    }
}
exports.default = OutcomeFactory;
//# sourceMappingURL=outcomeFactory.js.map