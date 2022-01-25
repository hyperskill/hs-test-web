import puppeteer from "puppeteer";

export default class Element {

    private elementHandle: puppeteer.ElementHandle;
    private selector: string;
    private parent: Element | null;
    private readonly page: puppeteer.Page;

    constructor(elementHandle: puppeteer.ElementHandle, selector: string, parent: Element | null, page: puppeteer.Page) {
        this.elementHandle = elementHandle;
        this.selector = selector;
        this.parent = parent;
        this.page = page;
    }

    // Element properties

    async getAttribute(attribute: string): Promise<string | null> {
        return await this.elementHandle.evaluate(
            (element, attribute) => element.getAttribute(attribute),
            attribute
        );
    }

    async getProperty(property: string): Promise<string> {
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
        const stylesStr = await this.elementHandle.evaluate(
            (element ) => JSON.stringify((element as HTMLElement).style)
        );
        return JSON.parse(stylesStr);
    }

    async getComputedStyles(): Promise<object> {
        const stylesStr = await this.elementHandle.evaluate(
            (element) => JSON.stringify(getComputedStyle(element))
        );
        return JSON.parse(stylesStr);
    }

    async select(selector: string): Promise<puppeteer.ElementHandle | null> {
        return await this.elementHandle.$(selector);
    }

    async selectAll(selector: string): Promise<puppeteer.ElementHandle[] | null> {
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
        const elementWrapper = new Element(element as puppeteer.ElementHandle, selector, this, this.page);
        if (element === null) {
            return element;
        }
        return elementWrapper;
    }

    async findAllByClassName(className: string) {
        const classSelector = `.${className}`;
        return this.findAllBySelector(classSelector);
    }

    async findAllBySelector(selector: string) {
        const elements = await this.selectAll(`${selector}`);
        if (elements?.length === 0) {
            return elements;
        }
        return elements?.map(element => new Element(element, selector, this, this.page));
    }

    async click(): Promise<void> {
        await this.elementHandle.click();
    }

    async inputText(text: string): Promise<void> {
        await this.elementHandle.focus();
        await this.page.keyboard.type(text);
    }
}
