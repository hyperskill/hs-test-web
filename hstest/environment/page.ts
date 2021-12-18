import puppeteer, {EvaluateFn} from 'puppeteer'

class Page {
    url: string;
    browser: puppeteer.Browser;
    isOpened: boolean;
    pageInstance: Promise<puppeteer.Page>

    constructor(url: string, browser: puppeteer.Browser) {
        this.url = url;
        this.browser = browser;
        this.isOpened = false;
        this.pageInstance = browser.newPage();
        this.initPageInstance();
    }

    async open(): Promise<void> {
        await this.pageInstance;
    }

    initPageInstance(): void {
        this.pageInstance.then(page => {
            page.goto(this.url).then(() => {
                this.isOpened = true;
            })
        })
    }

    execute(func: Function): Function {
        return async () => {
            await this.open();
            return (await this.pageInstance).evaluate(func as EvaluateFn)
        }
    }
}

export default Page;
