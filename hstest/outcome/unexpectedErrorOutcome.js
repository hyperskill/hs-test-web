const {Outcome} = require("./outcome.js")

const libPackage = require('../../package.json')
const puppeteerPackage = require('puppeteer/package.json')
const mochaPackage = require('mocha/package.json')
const os = require('os')

class UnexpectedErrorOutcome extends Outcome {

    constructor(testNum, cause) {
        super(testNum, "");
        this.errorText = "We have recorded this bug and will fix it soon.\n\n";

        const versions = `System ${os.platform()} ${os.release()} ${os.arch()}\n` +
            `Testing library version ${libPackage.version}\n` +
            `Node.js version ${process.versions.node}\n` +
            `Puppeteer version ${puppeteerPackage.version}\n` +
            `Mocha version ${mochaPackage.version}`

        this.errorText += versions + "\n\n"

        if (cause.stack) {
            this.errorText += cause.stack.toString();
        } else {
            this.errorText += cause.toString()
        }
    }

    getType() {
        return "Unexpected error";
    }
}

module.exports = {
    UnexpectedErrorOutcome
}
