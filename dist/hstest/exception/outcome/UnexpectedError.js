"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const OutcomeError_js_1 = __importDefault(require("./OutcomeError.js"));
class UnexpectedError extends OutcomeError_js_1.default {
    constructor(errorText, cause) {
        super(errorText);
        this.cause = cause;
    }
}
exports.default = UnexpectedError;
//# sourceMappingURL=UnexpectedError.js.map