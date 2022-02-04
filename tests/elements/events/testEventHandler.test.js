import {StageTest, correct, wrong} from "../../../dist/hstest/index.js"
import path from 'path'

const pagePath = path.join(import.meta.url, '../index.html')

class TestEventHandlerTest extends StageTest {

    page = this.getPage(pagePath)

    tests = [
        this.node.execute(async () => {
            const button = await this.page.findById("test-button");
            const waitPromise = this.page.waitForEvent("click", 2000);
            await button.click();
            return correct();
        })
    ]
}

it('test event handler', async () => {
    await new TestEventHandlerTest().runTests()
}).timeout(30000);
