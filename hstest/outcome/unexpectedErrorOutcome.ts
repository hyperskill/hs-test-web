import Outcome from "./outcome.js";
import os from 'os';

import * as libPackage from "../../package.json";
import * as puppeteerPackage from "puppeteer/package.json";
import * as mochaPackage from "mocha/package.json";

class UnexpectedErrorOutcome extends Outcome {

    constructor(testNum: number, cause: Error) {
        super(testNum, "");
        this.errorText = "We have recorded this bug and will fix it soon.\n\n";

        const versions = `System ${os.platform()} ${os.release()} ${os.arch()}\n` +
            `Testing library version ${libPackage.version}\n` +
            `Node.js version ${process.versions.node}\n` +
            `Puppeteer version ${puppeteerPackage.version}\n` +
            `Mocha version ${mochaPackage.version}`;

        this.errorText += versions + "\n\n";

        if (cause.stack) {
            this.errorText += cause.stack;
        } else {
            this.errorText += cause.toString();
        }
    }

    getType(): string {
        return "Unexpected error";
    }
}

export default UnexpectedErrorOutcome;
