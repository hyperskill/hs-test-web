import OutcomeError from "./OutcomeError.js";
class WrongAnswer extends OutcomeError {
    constructor(feedbackText) {
        super(undefined);
        this.feedbackText = feedbackText;
    }
}
export default WrongAnswer;
//# sourceMappingURL=WrongAnswer.js.map