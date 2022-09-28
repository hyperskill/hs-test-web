import {StageTest, correct, wrong} from "../../../../dist/hstest/index.js"
import path from 'path'

const pagePath = path.join(import.meta.url, '../index.html')

class TestSyncElementHandleWithDomOnFormSubmitTest extends StageTest {

    page = this.getPage(pagePath)

    tests = [
        this.node.execute(async () => {
            let el = await this.page.findByClassName("click-button");
            const submitButton = await this.page.findById("submit-button")
            await submitButton.click()
            await el.click()
            return correct();
        })
    ];
}

it('test elementHandleSyncWithDom on form submit', async () => {
    await new TestSyncElementHandleWithDomOnFormSubmitTest().runTests()
}).timeout(30000);
