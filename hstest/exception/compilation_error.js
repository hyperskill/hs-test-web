const {OutcomeError} = require("./outcome_error.js")

class CompilationError extends OutcomeError {
    constructor(errors) {
        super("Compilation error!");
        this.errors = errors;
    }
}

module.exports = {
    CompilationError
}
