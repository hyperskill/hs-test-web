import puppeteer, {
    LaunchOptions,
    Page,
    Browser as PuppeteerBrowser
} from 'puppeteer';

class Browser {
    private launched = false;
    private browser!: PuppeteerBrowser;
    private puppeteerLaunchArgs: LaunchOptions = {
        headless: (process.env.NODE_ENV || '').trim() === 'test_lib',
        defaultViewport: null,
        args: ['--start-maximized', '--disable-infobar'],
        devtools: false,
        // @ts-ignore
        ...global.browserOptions,
        ignoreDefaultArgs: ['--enable-automation'],
    };

    async launch(): Promise<void> {
        this.browser = await puppeteer.launch(this.puppeteerLaunchArgs);
        this.launched = true;
    }

    async newPage(): Promise<Page> {
        const page: Page = await this.browser.newPage();
        page.on('console', msg => {
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
