import Outcome from "./outcome.js";
import WrongAnswer from "../exception/outcome/WrongAnswer.js";
import WrongAnswerOutcome from "./wrongAnswerOutcome.js";
import UnexpectedErrorOutcome from "./unexpectedErrorOutcome.js";
import CompilationError from "../exception/outcome/CompilationError.js";
import CompilationErrorOutcome from "./compilationErrorOutcome.js";

export default class OutcomeFactory {
    static getOutcome(ex: Error, currTest: number): Outcome {
        if (ex instanceof WrongAnswer) {
            return new WrongAnswerOutcome(currTest, ex as WrongAnswer);
        } else if (ex instanceof CompilationError) {
            return new CompilationErrorOutcome(currTest, ex);
        } else {
            return new UnexpectedErrorOutcome(currTest, ex);
        }
    }
}
