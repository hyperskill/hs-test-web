const puppeteer = require("puppeteer")

class Browser {

    launched = false;

    async _initBrowser() {
        if (this.isLaunched()) {
            return
        }

        let additionalBrowserLaunchArgs = {}

        if (process.env.NODE_ENV != null && process.env.NODE_ENV.trim() === 'testlib') {
            additionalBrowserLaunchArgs['headless'] = true
        }

        let puppeteerLaunchArgs = {
            headless: false,
            defaultViewport: null,
            args: ['--start-maximized', '--disable-infobar'],
            ignoreDefaultArgs: ['--enable-automation'],
            debug: false,
            ...additionalBrowserLaunchArgs
        }

        this.browser = await puppeteer.launch(puppeteerLaunchArgs);
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
