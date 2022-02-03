import puppeteer from 'puppeteer';
class Browser {
    constructor() {
        this.launched = false;
        this.puppeteerLaunchArgs = {
            headless: (process.env.NODE_ENV || '').trim() === 'test_lib',
            defaultViewport: null,
            args: ['--start-maximized', '--disable-infobar'],
            ignoreDefaultArgs: ['--enable-automation'],
            devtools: true,
        };
    }
    async launch() {
        this.browser = await puppeteer.launch(this.puppeteerLaunchArgs);
        this.launched = true;
    }
    async newPage() {
        const page = await this.browser.newPage();
        page.on('console', msg => {
            console.log(`Log from ${page.url()}:`);
            console.log(msg.text());
        });
        return page;
    }
    async close() {
        if (!this.launched) {
            return;
        }
        await this.browser.close();
    }
}
export default Browser;
//# sourceMappingURL=browser.js.map