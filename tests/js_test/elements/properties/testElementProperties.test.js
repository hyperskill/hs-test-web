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

            const containerStyles = await container.getStyles()

            if (containerStyles.backgroundColor !== 'red') {
                return wrong('wrong backgroundColor')
            }

            const containerComputedStyles = await container.getComputedStyles()

            if (containerComputedStyles.backgroundColor !== 'rgb(255, 0, 0)') {
                return wrong('wrong backgroundColor')
            }

            const link = await this.page.findById('aLink')
            const hrefAttribute = await link.getAttribute('href')

            if (hrefAttribute !== 'testLink') {
                return wrong('wrong href attribute value!')
            }

            return correct()
        })
    ]
}

it('test elements', async () => {
    await new TestFindExistingElementsTest().runTests()
});
