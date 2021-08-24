const {CheckResult} = require("../outcome/check_result.js")


class Page {

    constructor(url, browser) {
        this.url = url;
        this.browser = browser;
        this.isOppened = false;
        this.pageInstance = null;
    }

    async execute(func) {
        return async () => {
            if (!this.isOppened) {
                this.pageInstance = await this.browser.newPage();
                await this.pageInstance.goto(this.url)
                await this.pageInstance.evaluate((CheckResultString) => {
                    eval(`window.CheckResult = ${CheckResultString}`);
                    this.wrong = CheckResult.wrong;
                    this.correct = CheckResult.correct;
                }, CheckResult.toString())
                this.isOppened = true
            }
            return await this.pageInstance.evaluate(func)
        }
    }
}

module.exports = {
    Page: Page
}
