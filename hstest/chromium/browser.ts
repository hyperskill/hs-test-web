import puppeteer from 'puppeteer'

class Browser {
    launched: boolean = false;
    browser!: puppeteer.Browser;
    puppeteerLaunchArgs: Object = {
        headless: false,
        defaultViewport: null,
        args: ['--start-maximized', '--disable-infobar'],
        ignoreDefaultArgs: ['--enable-automation'],
        debug: true,
        devtools: true,
    }

    async launch(): Promise<void> {
        this.browser = await puppeteer.launch(this.puppeteerLaunchArgs);
        this.launched = true;
    }

    async newPage(): Promise<puppeteer.Page> {
        const page: puppeteer.Page = await this.browser.newPage();
        page.on('console', msg => {
            console.log(`Log from ${page.url()}:`);
            console.log(msg.text());
        });
        return page;
    }

    async close(): Promise<void> {
        if (!this.launched) {
            return;
        }
        await this.browser.close();
    }
}

export default Browser;
