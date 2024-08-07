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
            message = '';
        }
        return new CheckResult(false, message);
    }

    static fromJson(json: CheckResultJson | unknown) {
        if (!CheckResult.isCheckResult(json)) {
            throw new Error("The result of the evaluate() method should be CheckResult instance!");
        }
        if (json.isCorrect) {
            return CheckResult.correct();
        } else {
            return CheckResult.wrong(json.feedback);
        }
    }

    static isCheckResult(json: object | unknown): json is CheckResultJson {
        return (json !== null && typeof json === "object" &&
          Object.prototype.hasOwnProperty.call(json, "isCorrect") &&
          Object.prototype.hasOwnProperty.call(json, "feedback")
        );
    }
}

export default CheckResult;
