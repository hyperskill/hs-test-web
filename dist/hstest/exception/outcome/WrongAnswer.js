import OutcomeError from "./OutcomeError.js";
class WrongAnswer extends OutcomeError {
    constructor(feedbackText) {
        super('');
        this.feedbackText = feedbackText;
    }
}
export default WrongAnswer;
//# sourceMappingURL=WrongAnswer.js.map