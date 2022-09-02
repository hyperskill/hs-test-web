"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = __importDefault(require("puppeteer"));
class Browser {
    constructor() {
        this.launched = false;
        this.puppeteerLaunchArgs = {
            headless: (process.env.NODE_ENV || '').trim() === 'test_lib',
            defaultViewport: null,
            args: ['--start-maximized', '--disable-infobar'],
            devtools: false,
            // @ts-ignore
            ...global.browserOptions,
            ignoreDefaultArgs: ['--enable-automation'],
        };
    }
    async launch() {
        this.browser = await puppeteer_1.default.launch(this.puppeteerLaunchArgs);
        this.launched = true;
    }
    async newPage() {
        const page = await this.browser.newPage();
        page.on('console', msg => {
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
exports.default = Browser;
//# sourceMappingURL=browser.js.map