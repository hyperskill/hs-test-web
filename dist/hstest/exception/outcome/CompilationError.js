"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const OutcomeError_js_1 = __importDefault(require("./OutcomeError.js"));
class CompilationError extends OutcomeError_js_1.default {
    constructor(errors) {
        super();
        this.errors = errors;
    }
}
exports.default = CompilationError;
//# sourceMappingURL=CompilationError.js.map