import {StageTest, correct} from "../../../../dist/hstest/index.js";
import path from 'path';
import { expect } from 'chai';

const pagePath = path.join(import.meta.url, '../index.html');

class TestSyncElementHandleWithDomOnNavigationTest extends StageTest {

    page = this.getPage(pagePath);

    tests = [
        this.node.execute(async () => {
            let el = await this.page.findByClassName("click-button");
            const submitButton = await this.page.findById("about-button");
            await submitButton.click();
            await el.click();
            return correct();
        })
    ];
}

it('test elementHandleSyncWithDom on navigation', async () => {
    try {
        await new TestSyncElementHandleWithDomOnNavigationTest().runTests();
    } catch (err) {
        expect(err.toString()).contain("Wrong answer in test #1\n\nThe element with selector '.click-button' is detached from the DOM!");
        return;
    }
    throw new Error("The test should fail!");
}).timeout(30000);
