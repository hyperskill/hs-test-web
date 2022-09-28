import {StageTest, correct, wrong} from "../../../../dist/hstest/index.js"
import path from 'path'

const pagePath = path.join(import.meta.url, '../index.html')

class TestFocusTest extends StageTest {

    page = this.getPage(pagePath)

    tests = [
        this.node.execute(async () => {
            const updateTextButton = await this.page.findById('update-text')
            await updateTextButton.focus();
            await this.page.evaluate(() => {
                return document.activeElement.id === 'update-text' ?
                    correct() : wrong("Wrong focused element!")
            })
        })
    ]
}

it('test focus element', async () => {
    await new TestFocusTest().runTests()
});
