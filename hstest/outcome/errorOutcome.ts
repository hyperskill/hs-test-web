import Outcome from "./outcome.js";

class ErrorOutcome extends Outcome {
    constructor(testNum: number, cause: Error) {
        super(testNum, cause.toString());
    }

    getType(): string {
        return "Error";
    }
}

export default ErrorOutcome;
