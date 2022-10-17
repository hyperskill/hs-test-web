import puppeteer from "puppeteer";
import puppeteerCore from "puppeteer-core";
import EventHandler from "../handler/eventHandler.js";
import {element2selector} from "puppeteer-element2selector";
import WrongAnswer from "../exception/outcome/WrongAnswer.js";

export default class Element {

    private readonly selector: Promise<string> | string;
    private readonly page: puppeteer.Page;
    private elementHandle: puppeteer.ElementHandle;
    private parent: Element | null;

    constructor(elementHandle: puppeteer.ElementHandle, selector: string, parent: Element | null, page: puppeteer.Page) {
        this.elementHandle = elementHandle;
        this.selector = selector;
        this.parent = parent;
        this.page = page;
    }

    static async new(elementHandle: puppeteer.ElementHandle, parent: Element | null, page: puppeteer.Page) {
        try {
            const selector = await element2selector(elementHandle as unknown as puppeteerCore.ElementHandle);
            return new Element(elementHandle, selector, parent, page);
        } catch (err) {
            throw new WrongAnswer('Make sure your elements don\'t have duplicated id attribute');
        }
    }

    async syncElementHandleWithDOM() {
        const selector = await this.selector;
        await this.page.waitForSelector(
            selector, {timeout: 3000}
        ).then(element => {
            if (element)
                this.elementHandle = element;
        }).catch(() => {
            throw new WrongAnswer(`The element with selector '${selector}' is detached from the DOM!`);
        });
    }

    // Element properties
    async getAttribute(attribute: string): Promise<string | null> {
        await this.syncElementHandleWithDOM();
        return await this.elementHandle.evaluate(
            (element, attribute) => element.getAttribute(attribute),
            attribute
        );
    }

    async getProperty(property: string): Promise<string> {
        await this.syncElementHandleWithDOM();
        const elementProperty = await this.elementHandle.getProperty(property);
        const elementPropertyString = (await elementProperty.jsonValue()) as string;
        return elementPropertyString.toString().trim();
    }

    async textContent(): Promise<string> {
        return await this.getProperty('textContent');
    }

    async innerHtml(): Promise<string> {
        return await this.getProperty('innerHTML');
    }

    async className(): Promise<string> {
        return await this.getProperty('className');
    }

    async getStyles(): Promise<object> {
        await this.syncElementHandleWithDOM();
        const stylesStr = await this.elementHandle.evaluate(
            (element) => JSON.stringify((element as HTMLElement).style)
        );
        return JSON.parse(stylesStr);
    }

    async getComputedStyles(): Promise<object> {
        await this.syncElementHandleWithDOM();
        const stylesStr = await this.elementHandle.evaluate(
            (element) => JSON.stringify(getComputedStyle(element))
        );
        return JSON.parse(stylesStr);
    }

    async select(selector: string): Promise<puppeteer.ElementHandle | null> {
        await this.syncElementHandleWithDOM();
        return await this.elementHandle.$(selector);
    }

    async selectAll(selector: string): Promise<puppeteer.ElementHandle[]> {
        await this.syncElementHandleWithDOM();
        return await this.elementHandle.$$(selector);
    }

    // Find functions

    async findById(id: string) {
        const idSelector = `#${id}`;
        return await this.findBySelector(idSelector);
    }

    async findByClassName(className: string) {
        const classSelector = `.${className}`;
        return await this.findBySelector(classSelector);
    }

    async findBySelector(selector: string) {
        const element = await this.select(`${selector}`);
        if (element === null) {
            return element;
        }
        return await Element.new(element as puppeteer.ElementHandle, this, this.page);
    }

    async findAllByClassName(className: string) {
        const classSelector = `.${className}`;
        return this.findAllBySelector(classSelector);
    }

    async findAllBySelector(selector: string) {
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

    async click(): Promise<void> {
        await this.syncElementHandleWithDOM();
        await this.elementHandle.evaluate((element: any) => {
            element.click();
        }, this.elementHandle);
    }

    async inputText(text: string): Promise<void> {
        await this.syncElementHandleWithDOM();
        await this.elementHandle.focus();
        await this.page.keyboard.type(text);
    }

    async focus(): Promise<void> {
        await this.syncElementHandleWithDOM();
        return this.elementHandle.focus();
    }

    async hover(): Promise<void> {
        await this.syncElementHandleWithDOM();
        return this.elementHandle.hover();
    }

    async waitForEvent(eventName: string, timeout = 10000): Promise<boolean> {
        await this.syncElementHandleWithDOM();
        return EventHandler.waitForEvent(eventName, this.page, this.elementHandle, timeout);
    }

    async clickForNavigation(option?: object) {
        await this.syncElementHandleWithDOM();
        return Promise.all(
            [
                this.page.waitForNavigation(option),
                this.elementHandle.click()
            ]
        );
    }
}
