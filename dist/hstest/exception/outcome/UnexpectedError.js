import OutcomeError from "./OutcomeError.js";
class UnexpectedError extends OutcomeError {
    constructor(errorText, cause) {
        super(errorText);
        this.errorText = errorText;
        this.cause = cause;
    }
}
export default UnexpectedError;
//# sourceMappingURL=UnexpectedError.js.map