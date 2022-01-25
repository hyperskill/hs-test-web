import Outcome from "./outcome.js";
import CompilationError from "../exception/outcome/CompilationError.js";

class CompilationErrorOutcome extends Outcome {
    constructor(testNum: number, compilationError: CompilationError) {
        super(0, "");

        for (const error of compilationError.errors) {
            this.errorText += error.stack + "\n\n";
        }
    }

    getType(): string {
        return "Compilation error";
    }
}

export default CompilationErrorOutcome;
