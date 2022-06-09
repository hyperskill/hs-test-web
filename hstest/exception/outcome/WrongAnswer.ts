import OutcomeError from "./OutcomeError.js";

class WrongAnswer extends OutcomeError {

    feedbackText: string;

    constructor(feedbackText: string) {
        super();
        this.feedbackText = feedbackText;
    }
}

export default WrongAnswer;
