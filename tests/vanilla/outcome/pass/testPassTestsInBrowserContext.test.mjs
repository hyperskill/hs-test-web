import {StageTest, correct, wrong} from "../../../../dist/hstest/index.js"
import path from 'path'

const pagePath = path.join(import.meta.url, '../../index.html')

class TestPassTestsInBrowserContextTest extends StageTest {

    page = this.getPage(pagePath)

    tests = [
        this.page.execute(() => {
            return correct();
        }),
        this.page.execute(() => {
            return correct();
        }),
        this.page.execute(() => {
            return correct();
        }),
        this.page.execute(() => {
            return correct();
        }),
    ]
}

it('Test pass all the tests in browser context', async () => {
    try {
        await new TestPassTestsInBrowserContextTest().runTests()
    } catch (err) {
        throw new Error("The test should pass all the tests!")
    }
});
