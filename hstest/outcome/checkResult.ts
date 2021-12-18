class CheckResult {

    isCorrect: boolean;
    feedback: string;

    constructor(correct: boolean, feedback: string) {
        this.isCorrect = correct;
        this.feedback = feedback;
    }

    static correct() {
        return new CheckResult(true, '')
    }

    static wrong(message: string) {
        return new CheckResult(false, message)
    }
}

export default CheckResult;
