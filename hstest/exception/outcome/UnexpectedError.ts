import OutcomeError from "./OutcomeError.js";

class UnexpectedError extends OutcomeError {

    cause?: Error;

    constructor(errorText: string, cause?: Error) {
        super(errorText);
        this.cause = cause;
    }
}

export default UnexpectedError;
