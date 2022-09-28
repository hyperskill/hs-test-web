import {StageTest, correct, wrong} from "../../../../dist/hstest/index.js"
import path from 'path'
import chai from 'chai'

const pagePath = path.join(import.meta.url, '../../index.html')

class TestWrongInBrowser extends StageTest {

    page = this.getPage(pagePath)

    tests = [
        this.page.execute(() => {
            return correct()
        }),
        this.page.execute(() => {
            return wrong("This is error message from the second test case in browser context!")
        }),
        this.page.execute(() => {
            return correct()
        })
    ];
}

it('test browser context fail the second test', async () => {
    try {
        await new TestWrongInBrowser().runTests()
    } catch (err) {
        chai.expect(err.toString()).contain("Wrong answer in test #2\n\n" +
            "This is error message from the second test case in browser context!")
        return
    }
    throw new Error("The test should fail with wrong answer message!")
});

class TestWrongInNode extends StageTest {

    tests = [
        this.node.execute(() => {
            return correct()
        }),
        this.node.execute(() => {
            return wrong("This is error message from the second test case in node context!")
        }),
        this.node.execute(() => {
            return correct()
        })
    ];
}

it('test node context fail the second test', async () => {
    try {
        await new TestWrongInNode().runTests()
    } catch (err) {
        chai.expect(err.toString()).contain("Wrong answer in test #2\n\n" +
            "This is error message from the second test case in node context!")
        return
    }
    throw new Error("The test should fail with wrong answer message!")
});
