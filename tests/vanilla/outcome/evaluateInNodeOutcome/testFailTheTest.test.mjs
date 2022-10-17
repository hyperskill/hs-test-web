import {StageTest, correct, wrong} from "../../../../dist/hstest/index.js"
import path from 'path'
import chai from 'chai'

const pagePath = path.join(import.meta.url, '../../index.html')

class TestFailTheTestTest extends StageTest {

    page = this.getPage(pagePath)

    tests = [
        this.node.execute(() => {
            return correct();
        }),
        this.node.execute(async () => {

            await this.page.evaluate(() => {
                return wrong("This test case is failed from evaluate method!");
            })

            return correct();
        }),
        this.node.execute(() => {
            return correct();
        })
    ]
}

it('Fail the test in evaluate method from node context', async () => {
    try {
        await new TestFailTheTestTest().runTests()
    } catch (err) {
        chai.expect(err.toString()).contain("Wrong answer in test #2\n\nThis test case is failed from evaluate method!")
        return
    }
    throw new Error("The test should fail with wrong answer message!")
});
