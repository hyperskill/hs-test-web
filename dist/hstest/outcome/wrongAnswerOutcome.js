"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const outcome_js_1 = __importDefault(require("./outcome.js"));
class WrongAnswerOutcome extends outcome_js_1.default {
    constructor(testNum, ex) {
        super(testNum, ex.feedbackText);
    }
    getType() {
        return "Wrong answer";
    }
}
exports.default = WrongAnswerOutcome;
//# sourceMappingURL=wrongAnswerOutcome.js.map