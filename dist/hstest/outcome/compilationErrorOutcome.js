"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const outcome_js_1 = __importDefault(require("./outcome.js"));
class CompilationErrorOutcome extends outcome_js_1.default {
    constructor(testNum, compilationError) {
        super(0, "");
        for (const error of compilationError.errors) {
            this.errorText += error.stack + "\n\n";
        }
    }
    getType() {
        return "Compilation error";
    }
}
exports.default = CompilationErrorOutcome;
//# sourceMappingURL=compilationErrorOutcome.js.map