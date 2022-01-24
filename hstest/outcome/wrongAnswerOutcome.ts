import Outcome from "./outcome.js";
import WrongAnswer from "../exception/outcome/WrongAnswer.js";

class WrongAnswerOutcome extends Outcome {
    constructor(testNum: number, ex: WrongAnswer) {
        super(testNum, ex.feedbackText);
    }

    getType(): string {
        return "Wrong answer";
    }
}

export default WrongAnswerOutcome;
