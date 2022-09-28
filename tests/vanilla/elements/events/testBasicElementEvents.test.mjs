import {StageTest, correct, wrong} from "../../../../dist/hstest/index.js"
import path from 'path'

const pagePath = path.join(import.meta.url, '../index.html')

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

class TestFocusEvent extends StageTest {

    page = this.getPage(pagePath)

    tests = [
        this.node.execute(async () => {
            const button = await this.page.findById("test-button");
            const isEventHappened = button.waitForEvent("mouseover", 2000);
            await button.hover();
            return (await isEventHappened === true) ? correct() : wrong("Expected hover event!");
        })
    ]
}

it('test onfocus', async () => {
    await new TestFocusEvent().runTests()
}).timeout(30000);

class TestClickEvent extends StageTest {

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

it('test click event', async () => {
    await new TestClickEvent().runTests()
}).timeout(30000);
