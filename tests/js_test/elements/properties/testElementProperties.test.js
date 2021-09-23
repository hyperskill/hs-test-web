const {StageTest, correct, wrong} = require("../../../../hstest")
const path = require("path")

const pagePath = path.join(__dirname, './index.html')

class TestFindExistingElementsTest extends StageTest {

    page = this.getPage(pagePath)

    tests = [
        this.node.execute(async () => {
            const container = await this.page.findByClassName('test')

            const textContent = await container.textContent()
            if (textContent !== 'Text in span') {
                return wrong('wrong text content!')
            }

            const innerHtml = await container.innerHtml()
            if (innerHtml !== '<span>Text in span</span>') {
                return wrong('wrong innerHTML')
            }

            const className = await container.className()
            if (className !== 'test') {
                return wrong('wrong className')
            }

            const backgroundColor = await container.getStyle('background-color')
            if (backgroundColor !== 'red') {
                return wrong('wrong backgroundColor')
            }

            return correct()
        })
    ]
}

test('test elements', async () => {
    await new TestFindExistingElementsTest().runTests()
});
