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
import WrongAnswer from "../exception/outcome/WrongAnswer.js";
import TestPassed from "../exception/outcome/TestPassed.js";
import Element from "./element.js";
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
    evaluate(func) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.open();
            const evaluationResult = yield this.pageInstance.evaluate(func);
            if (CheckResult.isCheckResult(evaluationResult)) {
                if (!evaluationResult.isCorrect) {
                    throw new WrongAnswer(evaluationResult.feedback);
                }
                else {
                    throw new TestPassed();
                }
            }
            return evaluationResult;
        });
    }
    _getBodyTag() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.open();
            const bodySelector = 'body';
            return new Element(yield this.pageInstance.$(bodySelector), bodySelector, null, this.pageInstance);
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield this._getBodyTag()).findById(id);
        });
    }
    findByClassName(className) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield this._getBodyTag()).findByClassName(className);
        });
    }
    findBySelector(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield this._getBodyTag()).findBySelector(selector);
        });
    }
    findAllByClassName(className) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield this._getBodyTag()).findAllByClassName(className);
        });
    }
    findAllBySelector(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield this._getBodyTag()).findAllBySelector(selector);
        });
    }
    navigate(url) {
        return __awaiter(this, void 0, void 0, function* () {
            // @ts-ignore
            yield this.pageInstance.navigate(url);
        });
    }
    refresh() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.pageInstance.reload({
                waitUntil: 'domcontentloaded'
            });
        });
    }
    currentUrl() {
        return this.pageInstance.url();
    }
}
export default Page;
//# sourceMappingURL=page.js.map