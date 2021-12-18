import puppeteer from 'puppeteer'

class Browser {
    launched: boolean = false;
    browser: any;
    puppeteerLaunchArgs: Object = {
        headless: false,
        defaultViewport: null,
        args: ['--start-maximized', '--disable-infobar'],
        ignoreDefaultArgs: ['--enable-automation'],
        debug: false,
    }

    async launch(): Promise<void> {
        this.browser = puppeteer.launch(this.puppeteerLaunchArgs);
        this.browser = (await this.browser) as puppeteer.Browser;
        this.launched = true;
    }

    async newPage(): Promise<puppeteer.Page> {
        if (!this.launched) {
            throw new Error("The browser is not opened! Call launch() method before!")
        }
        const page = await (this.browser as puppeteer.Browser).newPage();
        page.on('console', msg => console.log(msg.text()));
        return page;
    }

    async close(): Promise<void> {
        if (!this.launched) {
            return
        }
        await this.browser.close()
    }
}

export default Browser;
