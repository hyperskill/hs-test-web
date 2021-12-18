var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Page {
    constructor(url, browser) {
        this.url = url;
        this.browser = browser;
        this.isOpened = false;
        this.pageInstance = browser.newPage();
        this.initPageInstance();
    }
    open() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.pageInstance;
        });
    }
    initPageInstance() {
        this.pageInstance.then(page => {
            page.goto(this.url).then(() => {
                this.isOpened = true;
            });
        });
    }
    execute(func) {
        return () => __awaiter(this, void 0, void 0, function* () {
            yield this.open();
            return (yield this.pageInstance).evaluate(func);
        });
    }
}
export default Page;
//# sourceMappingURL=page.js.map