import {StageTest, correct, wrong} from "../../../../dist/hstest/index.js"
import path from 'path'

const pagePath = path.join(import.meta.url, '../index.html')

class TestHoverTest extends StageTest {

    page = this.getPage(pagePath)

    tests = [
        this.node.execute(async () => {
            const updateTextButton = await this.page.findById('update-text')
            let styles = await updateTextButton.getComputedStyles();
            if (styles.backgroundColor !== 'rgb(0, 0, 255)') {
                return wrong("The button background color should be blue before hover!")
            }
            await updateTextButton.hover()
            styles = await updateTextButton.getComputedStyles();
            if (styles.backgroundColor !== 'rgb(255, 0, 0)') {
                return wrong("The button background color should be red on hover!")
            }
            return correct()
        })
    ]
}

it('test hover element', async () => {
    await new TestHoverTest().runTests()
});
