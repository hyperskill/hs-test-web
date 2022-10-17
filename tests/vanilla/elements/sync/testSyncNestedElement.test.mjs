import {StageTest, correct, wrong} from "../../../../dist/hstest/index.js";
import path from 'path';

const pagePath = path.join(import.meta.url, '../index.html');

class TestSyncNestedElementTest extends StageTest {

    page = this.getPage(pagePath);

    tests = [
        this.node.execute(async () => {
            const el1 = await this.page.findByClassName("el1");
            const el2 = await el1.findByClassName("el2");
            await this.page.refresh();
            const el3 = await el2.findByClassName("el3");
            return correct();
        })
    ];
}

it('test nested elementHandleSyncWithDom', async () => {
    await new TestSyncNestedElementTest().runTests();
}).timeout(30000);
