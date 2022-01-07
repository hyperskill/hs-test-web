import OutcomeError from "./OutcomeError.js";

class UnexpectedError extends OutcomeError {

    errorText: string;
    cause?: Error;

    constructor(errorText: string, cause?: Error) {
        super(errorText);
        this.errorText = errorText;
        this.cause = cause;
    }
}

export default UnexpectedError;
