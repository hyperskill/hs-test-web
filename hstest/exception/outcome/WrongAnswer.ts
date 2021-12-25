import OutcomeError from "./OutcomeError.js";

class WrongAnswer extends OutcomeError {

    feedbackText: string;

    constructor(feedbackText: string) {
        super(undefined);
        this.feedbackText = feedbackText;
    }
}

export default WrongAnswer;
