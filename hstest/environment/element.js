const {WrongAnswer} = require("../exception/wrongAnswer.js")

class Element {

    constructor(elementHandle, selector, parent) {
        this.elementHandle = elementHandle
        this.selector = selector
        this.parent = parent
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

    async getStyle(style) {
        return (await this.elementHandle.evaluate(
            (element, style) => element.style.getPropertyValue(style).toString().trim(), style))
    }

    async getComputedStyle(style) {
        return await this.elementHandle.evaluate(
            (element, style) => getComputedStyle(element).getPropertyValue(style).toString().trim(), style)
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
        const elementWrapper = new Element(element, selector, this)
        if (element === null) {
            const elementPath = Element.getElementPath(elementWrapper)
            throw new WrongAnswer(`Can't find element '${elementPath}'`)
        }
        return elementWrapper
    }

    async findAllByClassName(className) {
        const classSelector = `.${className}`
        return this.findAllBySelector(classSelector)
    }

    async findAllBySelector(selector) {
        const elements = await this.selectAll(`${selector}`)
        const elementWrapper = new Element(elements, selector, this)
        if (elements.length === 0) {
            const elementPath = Element.getElementPath(elementWrapper)
            throw new WrongAnswer(`Can't find any element '${elementPath}'`)
        }
        return elements.map(element => new Element(element, selector, this))
    }
}

module.exports = {
    Element
}
