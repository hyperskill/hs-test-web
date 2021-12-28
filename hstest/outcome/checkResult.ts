import UnexpectedError from "../exception/outcome/UnexpectedError.js";

interface CheckResultJson {
    isCorrect: boolean,
    feedback: string
}

class CheckResult {

    isCorrect: boolean;
    feedback: string;

    constructor(correct: boolean, feedback: string) {
        this.isCorrect = correct;
        this.feedback = feedback;
    }

    static correct() {
        return new CheckResult(true, '');
    }

    static wrong(message: string) {
        if (message == null) {
            throw new UnexpectedError("The wrong answer feedback shouldn't be null");
        }
        return new CheckResult(false, message);
    }

    static fromJson(json: CheckResultJson) {
        if (json == null || !json.hasOwnProperty('isCorrect') || !json.hasOwnProperty('feedback')) {
            throw new Error("The result of the evaluate() method should be CheckResult instance!");
        }
        if (json.isCorrect) {
            return CheckResult.correct();
        } else {
            return CheckResult.wrong(json.feedback);
        }
    }
}

export default CheckResult;
