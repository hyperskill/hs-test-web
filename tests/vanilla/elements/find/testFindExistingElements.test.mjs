import {StageTest, correct, wrong} from "../../../../dist/hstest/index.js"
import path from 'path'

const pagePath = path.join(import.meta.url, '../index.html')

class TestFindExistingElementsTest extends StageTest {

    page = this.getPage(pagePath)

    tests = [
        this.node.execute(async () => {
            const test = await this.page.findByClassName('test')
            const another = await test.findByClassName('another')
            const inputField = await this.page.findBySelector('input[type="text"]')
            const byId = await this.page.findById("wrapper")
            return correct()
        })
    ]
}

it('test elements', async () => {
    await new TestFindExistingElementsTest().runTests()
});
