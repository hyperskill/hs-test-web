const {StageTest, correct, wrong} = require("../../../../hstest")
const path = require("path")

const pagePath = path.join(__dirname, './index.html')

class TestFindExistingElementsTest extends StageTest {

    page = this.getPage(pagePath)

    tests = [
        this.node.execute(async () => {
            const testButton = await this.page.findById('test')
            await testButton.click()
            await testButton.click()
            await testButton.click()
            await testButton.click()
            await testButton.click()
            const counter = await this.page.findById('counter')
            const counterText = await counter.textContent()
            if (counterText !== '5') {
                return wrong('wrong counter value after 5 clicks!')
            }

            return correct()
        })
    ]
}

it('test elements', async () => {
    await new TestFindExistingElementsTest().runTests()
});
