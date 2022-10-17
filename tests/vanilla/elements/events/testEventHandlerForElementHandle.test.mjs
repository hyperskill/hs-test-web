import {StageTest, correct, wrong} from "../../../../dist/hstest/index.js"
import path from 'path'

const pagePath = path.join(import.meta.url, '../index.html')

class TestEventHandlerForElementHandleTest extends StageTest {

    page = this.getPage(pagePath)

    tests = [
        this.node.execute(async () => {
            const button = await this.page.findById("test-button");
            const isEventHappened = button.waitForEvent("click", 2000);
            await button.click();
            return (await isEventHappened === true) ? correct() : wrong("Expected click event!");
        })
    ]
}

it('test event handler for element handle', async () => {
    await new TestEventHandlerForElementHandleTest().runTests()
}).timeout(30000);
