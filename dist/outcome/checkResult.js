class CheckResult {
    constructor(correct, feedback) {
        this.isCorrect = correct;
        this.feedback = feedback;
    }
    static correct() {
        return new CheckResult(true, '');
    }
    static wrong(message) {
        return new CheckResult(false, message);
    }
}
export default CheckResult;
//# sourceMappingURL=checkResult.js.map