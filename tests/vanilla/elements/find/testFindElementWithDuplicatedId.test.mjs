import {StageTest, correct} from "../../../../dist/hstest/index.js"
import path from 'path'
import { expect } from "chai";

const pagePath = path.join(import.meta.url, '../duplicated-id.html')

class TestFindElementWithDuplicatedIdTest extends StageTest {

    page = this.getPage(pagePath)

    tests = [
        this.node.execute(async () => {
            let history = await this.page.findAllByClassName("submit-history-card")

            const firstCard = history[0]

            const deleteButton = await firstCard.findBySelector('button.delete-button');
            await deleteButton.click()
            return correct()
        })
    ]
}

it('test elements', async () => {
    try {
        await new TestFindElementWithDuplicatedIdTest().runTests()
        throw new Error("The test fail with Error outcome!")
    } catch (err) {
        expect(err.toString()).to.contain("Make sure your elements don't have duplicated id attribute")
    }
});
