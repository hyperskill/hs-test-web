var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import puppeteer from 'puppeteer';
class Browser {
    constructor() {
        this.launched = false;
        this.puppeteerLaunchArgs = {
            headless: (process.env.NODE_ENV || '').trim() === 'test_lib',
            defaultViewport: null,
            args: ['--start-maximized', '--disable-infobar'],
            ignoreDefaultArgs: ['--enable-automation'],
            debug: true,
            devtools: true,
        };
    }
    launch() {
        return __awaiter(this, void 0, void 0, function* () {
            this.browser = yield puppeteer.launch(this.puppeteerLaunchArgs);
            this.launched = true;
        });
    }
    newPage() {
        return __awaiter(this, void 0, void 0, function* () {
            const page = yield this.browser.newPage();
            page.on('console', msg => {
                console.log(`Log from ${page.url()}:`);
                console.log(msg.text());
            });
            return page;
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.launched) {
                return;
            }
            yield this.browser.close();
        });
    }
}
export default Browser;
//# sourceMappingURL=browser.js.map