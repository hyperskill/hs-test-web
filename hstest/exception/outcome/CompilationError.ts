import OutcomeError from "./OutcomeError.js";

class CompilationError extends OutcomeError {

    readonly errors: Error[];

    constructor(errors: Error[]) {
        super();
        this.errors = errors;
    }
}

export default CompilationError;
