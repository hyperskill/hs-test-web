const {WrongAnswer} = require("../exception/wrongAnswer.js")


class Element {
    constructor(elementHandle) {
        this.elementHandle = elementHandle
    }

    async select(selector) {
        return await this.elementHandle.$(selector)
    }

    async findById(id) {
        const element = await this.select(`#${id}`)
        if (element === null) {
            throw new WrongAnswer(`Can't find element with id '${id}'`)
        }
        return new Element(element)
    }

    async findByClassName(className) {
        const element = await this.select(`.${className}`)
        if (element === null) {
            throw new WrongAnswer(`Can't find element with class '${className}'`)
        }
        return new Element(element)
    }

    async findBySelector(selector) {
        const element = await this.select(`${selector}`)
        if (element === null) {
            throw new WrongAnswer(`Can't find element with selector '${selector}'`)
        }
        return new Element(element)
    }
}

module.exports = {
    Element
}
