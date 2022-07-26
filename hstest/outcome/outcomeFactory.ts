import Outcome from "./outcome.js";
import WrongAnswer from "../exception/outcome/WrongAnswer.js";
import WrongAnswerOutcome from "./wrongAnswerOutcome.js";
import UnexpectedErrorOutcome from "./unexpectedErrorOutcome.js";
import CompilationError from "../exception/outcome/CompilationError.js";
import CompilationErrorOutcome from "./compilationErrorOutcome.js";
import ErrorOutcome from "./errorOutcome.js";

export default class OutcomeFactory {
    static getOutcome(ex: Error, currTest: number): Outcome {
        if (ex instanceof WrongAnswer) {
            return new WrongAnswerOutcome(currTest, ex as WrongAnswer);
        } else if (ex instanceof CompilationError) {
            return new CompilationErrorOutcome(currTest, ex);
        } else if (ex.toString().toLowerCase().includes("protocol error")
            || ex.toString().toLowerCase().includes("chromium revision is not downloaded")) {
            return new ErrorOutcome(currTest, ex);
        } else if (ex.toString().toLowerCase().includes("context was destroyed")) {
            return new WrongAnswerOutcome(currTest, new WrongAnswer("The page has been reloaded or navigated, but it should not"));
        } else {
            return new UnexpectedErrorOutcome(currTest, ex);
        }
    }
}
