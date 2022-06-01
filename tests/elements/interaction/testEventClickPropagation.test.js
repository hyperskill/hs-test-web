const {StageTest, correct, wrong} = require("../../../dist/hstest/index.js")
const path = require('path')

const pagePath = path.resolve(__dirname, 'index.html')

class TestFindExistingElementsTest extends StageTest {

    page = this.getPage(pagePath)

    tests = [
        this.node.execute(async () => {
            const testButton = await this.page.findById('child-button')
            await testButton.click()
            const counter = await this.page.findById('text-from-input')
            const counterText = await counter.textContent()
            if (counterText !== 'Event propagated!') {
                return wrong('Click event not propagated!')
            }
            return correct()
        }),

    ]
}

it('test click event propagation', async () => {
    await new TestFindExistingElementsTest().runTests()
});
