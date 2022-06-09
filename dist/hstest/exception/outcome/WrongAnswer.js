"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const OutcomeError_js_1 = __importDefault(require("./OutcomeError.js"));
class WrongAnswer extends OutcomeError_js_1.default {
    constructor(feedbackText) {
        super();
        this.feedbackText = feedbackText;
    }
}
exports.default = WrongAnswer;
//# sourceMappingURL=WrongAnswer.js.map