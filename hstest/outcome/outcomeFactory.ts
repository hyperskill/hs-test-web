import Outcome from "./outcome.js";
import WrongAnswer from "../exception/outcome/WrongAnswer.js";
import WrongAnswerOutcome from "./wrongAnswerOutcome.js";
import UnexpectedErrorOutcome from "./unexpectedErrorOutcome.js";

export default class OutcomeFactory {
    static getOutcome(ex: Error, currTest: number): Outcome {
        if (ex instanceof WrongAnswer) {
            return new WrongAnswerOutcome(currTest, ex as WrongAnswer)
        } else {
            return new UnexpectedErrorOutcome(currTest, ex)
        }
    }
}
