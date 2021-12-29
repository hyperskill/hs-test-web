var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default class Element {
    constructor(elementHandle, selector, parent, page) {
        this.elementHandle = elementHandle;
        this.selector = selector;
        this.parent = parent;
        this.page = page;
    }
    static getElementPath(element) {
        const elements = [];
        let currentElement = element;
        while (currentElement) {
            elements.push(currentElement.selector);
            currentElement = currentElement.parent;
        }
        return elements.reverse().join(' > ');
    }
    // Element properties
    getAttribute(attribute) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.elementHandle.evaluate((element, attribute) => element.getAttribute(attribute), attribute);
        });
    }
    getProperty(property) {
        return __awaiter(this, void 0, void 0, function* () {
            const elementProperty = yield this.elementHandle.getProperty(property);
            const elementPropertyString = (yield elementProperty.jsonValue());
            return elementPropertyString.trim();
        });
    }
    textContent() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getProperty('textContent');
        });
    }
    innerHtml() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getProperty('innerHTML');
        });
    }
    className() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getProperty('className');
        });
    }
    getStyles() {
        return __awaiter(this, void 0, void 0, function* () {
            const stylesStr = yield this.elementHandle.evaluate(
            // @ts-ignore
            (element) => JSON.stringify(element.style));
            return JSON.parse(stylesStr);
        });
    }
    getComputedStyles() {
        return __awaiter(this, void 0, void 0, function* () {
            const stylesStr = yield this.elementHandle.evaluate((element) => JSON.stringify(getComputedStyle(element)));
            return JSON.parse(stylesStr);
        });
    }
    select(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.elementHandle.$(selector);
        });
    }
    selectAll(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.elementHandle.$$(selector);
        });
    }
    // Find functions
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const idSelector = `#${id}`;
            return yield this.findBySelector(idSelector);
        });
    }
    findByClassName(className) {
        return __awaiter(this, void 0, void 0, function* () {
            const classSelector = `.${className}`;
            return yield this.findBySelector(classSelector);
        });
    }
    findBySelector(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            const element = yield this.select(`${selector}`);
            const elementWrapper = new Element(element, selector, this, this.page);
            if (element === null) {
                return element;
            }
            return elementWrapper;
        });
    }
    findAllByClassName(className) {
        return __awaiter(this, void 0, void 0, function* () {
            const classSelector = `.${className}`;
            return this.findAllBySelector(classSelector);
        });
    }
    findAllBySelector(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            const elements = yield this.selectAll(`${selector}`);
            if ((elements === null || elements === void 0 ? void 0 : elements.length) === 0) {
                return elements;
            }
            return elements === null || elements === void 0 ? void 0 : elements.map(element => new Element(element, selector, this, this.page));
        });
    }
    click() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.elementHandle.click();
        });
    }
    inputText(text) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.elementHandle.focus();
            yield this.page.keyboard.type(text);
        });
    }
}
//# sourceMappingURL=element.js.map