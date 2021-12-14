const {StageTest, correct, wrong} = require("../../../../hstest")
const path = require("path")

const pagePath = path.join(__dirname, './index.html')

class TestFindExistingElementsTest extends StageTest {

    page = this.getPage(pagePath)

    tests = [
        this.node.execute(async () => {
            const inputField = await this.page.findById('input-text')
            await inputField.inputText('test text content!')
            const updateTextButton = await this.page.findById('update-text')

            await updateTextButton.click()

            const textDiv = await this.page.findById('text-from-input')
            if (await textDiv.textContent() !== 'test text content!') {
                return wrong('wrong text content!')
            }

            return correct()
        })
    ]
}

it('test elements', async () => {
    await new TestFindExistingElementsTest().runTests()
});
