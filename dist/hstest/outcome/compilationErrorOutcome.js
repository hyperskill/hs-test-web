import Outcome from "./outcome.js";
class CompilationErrorOutcome extends Outcome {
    constructor(testNum, compilationError) {
        super(0, "");
        for (const error of compilationError.errors) {
            this.errorText += error.stack + "\n\n";
        }
    }
    getType() {
        return "Compilation error";
    }
}
export default CompilationErrorOutcome;
//# sourceMappingURL=compilationErrorOutcome.js.map