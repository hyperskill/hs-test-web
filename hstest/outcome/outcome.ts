export default class Outcome {

    testNumber: number;
    errorText: string;

    constructor(testNumber: number, errorText: string) {
        this.testNumber = testNumber;
        this.errorText = errorText;
    }

    getType(): string {
        return "";
    }

    toString(): string {
        let whenErrorHappened = "";
        if (this.testNumber === 0) {
            whenErrorHappened = " during testing";
        } else if (this.testNumber > 0) {
            whenErrorHappened = " in test #" + this.testNumber;
        }

        let result: string = this.getType() + whenErrorHappened;

        if (this.errorText.length !== 0) {
            result += "\n\n" + this.errorText.trim();
        }

        return result.trim();
    }
}
