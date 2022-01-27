const {OutcomeError} = require("./outcomeError.js")

class CompilationError extends OutcomeError {
    constructor(errors) {
        super("Compilation error!");
        this.errors = errors;
    }
}

module.exports = {
    CompilationError
}
