import OutcomeError from "./OutcomeError.js";
class CompilationError extends OutcomeError {
    constructor(errors) {
        super();
        this.errors = errors;
    }
}
export default CompilationError;
//# sourceMappingURL=CompilationError.js.map