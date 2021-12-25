var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import BrowserPageHandler from "../handler/browserPageHandler.js";
import CheckResult from "../outcome/checkResult.js";
class Page {
    constructor(url, browser) {
        this.url = url;
        this.browser = browser;
        this.isOpened = false;
    }
    open() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isOpened) {
                return;
            }
            this.pageInstance = yield this.browser.newPage();
            yield this.pageInstance.goto(this.url);
            yield BrowserPageHandler.initHyperskillContext(this.pageInstance);
            this.isOpened = true;
        });
    }
    execute(func) {
        return () => __awaiter(this, void 0, void 0, function* () {
            yield this.open();
            const result = yield this.pageInstance.evaluate(func);
            return CheckResult.fromJson(result);
        });
    }
}
export default Page;
//# sourceMappingURL=page.js.map