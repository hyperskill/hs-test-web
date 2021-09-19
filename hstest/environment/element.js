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

    async select(selector) {
        return await this.elementHandle.$(selector)
    }

    async findById(id) {
        const idSelector = `#${id}`
        const element = await this.select(idSelector)
        const elementWrapper = new Element(element, idSelector, this)
        if (element === null) {
            const elementPath = Element.getElementPath(elementWrapper)
            throw new WrongAnswer(`Can't find element '${elementPath}'`)
        }
        return elementWrapper
    }

    async findByClassName(className) {
        const classSelector = `.${className}`
        const element = await this.select(classSelector)
        const elementWrapper = new Element(element, classSelector, this)
        if (element === null) {
            const elementPath = Element.getElementPath(elementWrapper)
            throw new WrongAnswer(`Can't find element '${elementPath}'`)
        }
        return elementWrapper
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
}

module.exports = {
    Element
}
