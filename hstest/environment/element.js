class Element {

    constructor(elementHandle, selector, parent, page) {
        this.elementHandle = elementHandle
        this.selector = selector
        this.parent = parent
        this.page = page
    }

    static getElementPath(element) {
        const elements = []
        let currentElement = element
        while (currentElement) {
            elements.push(currentElement.selector)
            currentElement = currentElement.parent
        }
        return elements.reverse().join(' > ')
    }

    // Element properties

    async getAttribute(attribute) {
        return await this.elementHandle.evaluate(
            (element, attribute) => element.getAttribute(attribute),
            attribute
        )
    }

    async getProperty(property) {
        return (await this.elementHandle.getProperty(property).then(result => result.jsonValue())).toString().trim()
    }

    async textContent() {
        return await this.getProperty('textContent')
    }

    async innerHtml() {
        return await this.getProperty('innerHTML')
    }

    async className() {
        return await this.getProperty('className')
    }

    async getStyles() {
        const stylesStr = await this.elementHandle.evaluate(
            (element) => JSON.stringify(element.style)
        )
        return JSON.parse(stylesStr)
    }

    async getComputedStyles() {
        const stylesStr = await this.elementHandle.evaluate(
            (element) => JSON.stringify(getComputedStyle(element))
        )
        return JSON.parse(stylesStr)
    }

    async select(selector) {
        return await this.elementHandle.$(selector)
    }

    async selectAll(selector) {
        return await this.elementHandle.$$(selector)
    }

    // Find functions

    async findById(id) {
        const idSelector = `#${id}`
        return await this.findBySelector(idSelector)
    }

    async findByClassName(className) {
        const classSelector = `.${className}`
        return await this.findBySelector(classSelector)
    }

    async findBySelector(selector) {
        const element = await this.select(`${selector}`)
        const elementWrapper = new Element(element, selector, this, this.page)
        if (element === null) {
            return element
        }
        return elementWrapper
    }

    async findAllByClassName(className) {
        const classSelector = `.${className}`
        return this.findAllBySelector(classSelector)
    }

    async findAllBySelector(selector) {
        const elements = await this.selectAll(`${selector}`)
        if (elements.length === 0) {
            return elements
        }
        return elements.map(element => new Element(element, selector, this, this.page))
    }

    async click() {
        await this.elementHandle.click()
    }

    async inputText(text) {
        await this.elementHandle.focus()
        await this.page.keyboard.type(text)
    }
}

module.exports = {
    Element
}
