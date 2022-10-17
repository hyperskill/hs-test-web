import {StageTest, correct, wrong} from "../../../../dist/hstest/index.js"
import path from 'path'

const pagePath = path.join(import.meta.url, '../index.html')

class TestSyncElementHandleWithDomTest extends StageTest {

    page = this.getPage(pagePath)

    tests = [
        this.node.execute(async () => {
            let el = await this.page.findByClassName("click-button");
            await this.page.refresh();
            await el.click();
            return correct();
        })
    ];
}

it('test elementHandleSyncWithDom on context reload', async () => {
    await new TestSyncElementHandleWithDomTest().runTests()
}).timeout(30000);
