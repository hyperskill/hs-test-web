import WrongAnswer from "../exception/outcome/WrongAnswer.js";
import WrongAnswerOutcome from "./wrongAnswerOutcome.js";
import UnexpectedErrorOutcome from "./unexpectedErrorOutcome.js";
export default class OutcomeFactory {
    static getOutcome(ex, currTest) {
        if (ex instanceof WrongAnswer) {
            return new WrongAnswerOutcome(currTest, ex);
        }
        else {
            return new UnexpectedErrorOutcome(currTest, ex);
        }
    }
}
//# sourceMappingURL=outcomeFactory.js.map