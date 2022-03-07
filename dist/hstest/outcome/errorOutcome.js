"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const outcome_js_1 = __importDefault(require("./outcome.js"));
class ErrorOutcome extends outcome_js_1.default {
    constructor(testNum, cause) {
        super(testNum, cause.toString());
    }
    getType() {
        return "Error";
    }
}
exports.default = ErrorOutcome;
//# sourceMappingURL=errorOutcome.js.map