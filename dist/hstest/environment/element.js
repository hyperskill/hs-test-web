import EventHandler from "../handler/eventHandler.js";
import { element2selector } from "puppeteer-element2selector";
import WrongAnswer from "../exception/outcome/WrongAnswer.js";
export default class Element {
    constructor(elementHandle, selector, parent, page) {
        this.elementHandle = elementHandle;
        this.selector = element2selector(elementHandle);
        this.parent = parent;
        this.page = page;
    }
    async syncElementHandleWithDOM() {
        const selector = await this.selector;
        await this.page.waitForSelector(selector, { timeout: 3000 }).then(element => {
            if (element)
                this.elementHandle = element;
        }).catch(() => {
            throw new WrongAnswer(`The element with selector '${selector}' is detached from the DOM!`);
        });
    }
    // Element properties
    async getAttribute(attribute) {
        return await this.elementHandle.evaluate((element, attribute) => element.getAttribute(attribute), attribute);
    }
    async getProperty(property) {
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
        const stylesStr = await this.elementHandle.evaluate((element) => JSON.stringify(element.style));
        return JSON.parse(stylesStr);
    }
    async getComputedStyles() {
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
        const elementWrapper = new Element(element, selector, this, this.page);
        if (element === null) {
            return element;
        }
        return elementWrapper;
    }
    async findAllByClassName(className) {
        const classSelector = `.${className}`;
        return this.findAllBySelector(classSelector);
    }
    async findAllBySelector(selector) {
        const elements = await this.selectAll(`${selector}`);
        if (elements?.length === 0) {
            return elements;
        }
        return elements?.map(element => new Element(element, selector, this, this.page));
    }
    async click() {
        await this.syncElementHandleWithDOM();
        await this.elementHandle.click();
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
        return EventHandler.waitForEvent(eventName, this.page, this.elementHandle, timeout);
    }
    async clickForNavigation(option) {
        await this.syncElementHandleWithDOM();
        return Promise.all([
            this.page.waitForNavigation(option),
            this.elementHandle.click()
        ]);
    }
}
//# sourceMappingURL=element.js.map