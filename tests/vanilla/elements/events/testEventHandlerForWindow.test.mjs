import {StageTest, correct, wrong} from "../../../../dist/hstest/index.js"
import path from 'path'

const pagePath = path.join(import.meta.url, '../index.html')

class TestEventHandlerForWindowTest extends StageTest {

    page = this.getPage(pagePath)

    tests = [
        this.node.execute(async () => {
            const button = await this.page.findById("test-button");
            const isEventHappened = this.page.waitForEvent("click", 2000);
            await button.click();
            return (await isEventHappened === true) ? correct() : wrong("Expected click event!");
        })
    ]
}

it('test event handler for window', async () => {
    await new TestEventHandlerForWindowTest().runTests()
}).timeout(30000);
