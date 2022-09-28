import {StageTest, correct, wrong} from "../../../../dist/hstest/index.js"
import path from 'path'

const pagePath = path.join(import.meta.url, '../../index.html')

class TestPassTheTestTest extends StageTest {

    page = this.getPage(pagePath)

    tests = [
        this.node.execute(() => {
            return correct();
        }),
        this.node.execute(async () => {

            await this.page.evaluate(() => {
                return correct();
            })

            return wrong("This line shouldn't be executed!");
        }),
        this.node.execute(() => {
            return correct();
        })
    ]
}

it('Pass the test in evaluate method from node context', async () => {
    try {
        await new TestPassTheTestTest().runTests()
    } catch (err) {
        throw new Error("The test shouldn't fail")
    }
});
