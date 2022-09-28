import {StageTest, correct, wrong} from "../../../../dist/hstest/index.js"
import path from 'path'

const pagePath = path.join(import.meta.url, '../index.html')

class TestPageEvaluateResult extends StageTest {

    page = this.getPage(pagePath)

    tests = [
        this.node.execute(async () => {

            const result = await this.page.evaluate(() => {
                return 'test'
            })

            if (result !== 'test') {
                return wrong('wrong evaluation result!')
            }

            return correct()
        })
    ];
}

it('Test result of the evaluate method', async () => {
    try {
        await new TestPageEvaluateResult().runTests()
    } catch (err) {
        throw new Error("The test should pass all test cases!")
    }
});
