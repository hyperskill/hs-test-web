const {StageTest, correct, wrong} = require("../../../hstest/index.js")
const path = require("path")

const pagePath = path.join(__dirname, './index.html')

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

it('test evaluate result', async () => {
    try {
        await new TestPageEvaluateResult().runTests()
    } catch (err) {
        throw new Error("The test should pass all test cases!")
    }
});
