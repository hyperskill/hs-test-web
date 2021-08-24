const puppeteer = require("puppeteer")

class Browser {

    launched = false;

    async _initBrowser() {
        if (this.isLaunched()) {
            return
        }

        this.browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ['--start-maximized', '--disable-infobar'],
            ignoreDefaultArgs: ['--enable-automation'],
            debug: false
        });

        this.launched = true;
    }

    async newPage() {
        const page = await this.browser.newPage();
        page.on('console', msg => console.log(msg.text()));
        return page;
    }

    isLaunched() {
        return this.launched
    }

    async launch() {
        await this._initBrowser();
    }

    async close() {
        await this.browser.close();
    }
}

module.exports = {
    Browser: Browser
}
