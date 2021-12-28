import Outcome from "./outcome.js";
class WrongAnswerOutcome extends Outcome {
    constructor(testNum, ex) {
        super(testNum, ex.feedbackText);
    }
    getType() {
        return "Wrong answer";
    }
}
export default WrongAnswerOutcome;
//# sourceMappingURL=wrongAnswerOutcome.js.map