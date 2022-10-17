"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const eventHandler_js_1 = __importDefault(require("../handler/eventHandler.js"));
const puppeteer_element2selector_1 = require("puppeteer-element2selector");
const WrongAnswer_js_1 = __importDefault(require("../exception/outcome/WrongAnswer.js"));
class Element {
    constructor(elementHandle, selector, parent, page) {
        this.elementHandle = elementHandle;
        this.selector = selector;
        this.parent = parent;
        this.page = page;
    }
    static async new(elementHandle, parent, page) {
        try {
            const selector = await (0, puppeteer_element2selector_1.element2selector)(elementHandle);
            return new Element(elementHandle, selector, parent, page);
        }
        catch (err) {
            throw new WrongAnswer_js_1.default('Make sure your elements don\'t have duplicated id attribute');
        }
    }
    async syncElementHandleWithDOM() {
        const selector = await this.selector;
        await this.page.waitForSelector(selector, { timeout: 3000 }).then(element => {
            if (element)
                this.elementHandle = element;
        }).catch(() => {
            throw new WrongAnswer_js_1.default(`The element with selector '${selector}' is detached from the DOM!`);
        });
    }
    // Element properties
    async getAttribute(attribute) {
        await this.syncElementHandleWithDOM();
        return await this.elementHandle.evaluate((element, attribute) => element.getAttribute(attribute), attribute);
    }
    async getProperty(property) {
        await this.syncElementHandleWithDOM();
        const elementProperty = await this.elementHandle.getProperty(property);
        const elementPropertyString = (await elementProperty.jsonValue());
        return elementPropertyString.toString().trim();
    }
    async textContent() {
        return await this.getProperty('textContent');
    }
    async innerHtml() {
        return await this.getProperty('innerHTML');
    }
    async className() {
        return await this.getProperty('className');
    }
    async getStyles() {
        await this.syncElementHandleWithDOM();
        const stylesStr = await this.elementHandle.evaluate((element) => JSON.stringify(element.style));
        return JSON.parse(stylesStr);
    }
    async getComputedStyles() {
        await this.syncElementHandleWithDOM();
        const stylesStr = await this.elementHandle.evaluate((element) => JSON.stringify(getComputedStyle(element)));
        return JSON.parse(stylesStr);
    }
    async select(selector) {
        await this.syncElementHandleWithDOM();
        return await this.elementHandle.$(selector);
    }
    async selectAll(selector) {
        await this.syncElementHandleWithDOM();
        return await this.elementHandle.$$(selector);
    }
    // Find functions
    async findById(id) {
        const idSelector = `#${id}`;
        return await this.findBySelector(idSelector);
    }
    async findByClassName(className) {
        const classSelector = `.${className}`;
        return await this.findBySelector(classSelector);
    }
    async findBySelector(selector) {
        const element = await this.select(`${selector}`);
        if (element === null) {
            return element;
        }
        return await Element.new(element, this, this.page);
    }
    async findAllByClassName(className) {
        const classSelector = `.${className}`;
        return this.findAllBySelector(classSelector);
    }
    async findAllBySelector(selector) {
        const elements = await this.selectAll(`${selector}`);
        if (elements.length === 0) {
            return elements;
        }
        const resultElements = [];
        for (let i = 0; i < elements.length; i++) {
            resultElements.push(await Element.new(elements[i], this, this.page));
        }
        return resultElements;
    }
    async click() {
        await this.syncElementHandleWithDOM();
        await this.elementHandle.evaluate((element) => {
            element.click();
        }, this.elementHandle);
    }
    async inputText(text) {
        await this.syncElementHandleWithDOM();
        await this.elementHandle.focus();
        await this.page.keyboard.type(text);
    }
    async focus() {
        await this.syncElementHandleWithDOM();
        return this.elementHandle.focus();
    }
    async hover() {
        await this.syncElementHandleWithDOM();
        return this.elementHandle.hover();
    }
    async waitForEvent(eventName, timeout = 10000) {
        await this.syncElementHandleWithDOM();
        return eventHandler_js_1.default.waitForEvent(eventName, this.page, this.elementHandle, timeout);
    }
    async clickForNavigation(option) {
        await this.syncElementHandleWithDOM();
        return Promise.all([
            this.page.waitForNavigation(option),
            this.elementHandle.click()
        ]);
    }
}
exports.default = Element;
//# sourceMappingURL=element.js.map