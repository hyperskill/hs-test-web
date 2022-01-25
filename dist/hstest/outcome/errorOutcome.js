import Outcome from "./outcome.js";
class ErrorOutcome extends Outcome {
    constructor(testNum, cause) {
        super(testNum, cause.toString());
    }
    getType() {
        return "Error";
    }
}
export default ErrorOutcome;
//# sourceMappingURL=errorOutcome.js.map