const {StageTest, correct, wrong} = require("../../../hstest/index.js")
const path = require("path")
const chai = require('chai')

const pagePath = path.join(__dirname, './index.html')

class TestWrongInBrowser extends StageTest {

    page = this.getPage(pagePath)

    tests = [
        this.page.execute(() => {
            return wrong("This is error message!")
        })
    ];
}

it('test browser context', async () => {
    try {
        await new TestWrongInBrowser().runTests()
    } catch (err) {
        chai.expect(err.toString()).contain("Wrong answer in test #1\n\nThis is error message!")
        return
    }
    throw new Error("The test should fail with wrong answer message!")
});

class TestWrongInNode extends StageTest {

    tests = [
        this.node.execute(() => {
            return wrong("This is error message!")
        })
    ];
}

it('test browser context', async () => {
    try {
        await new TestWrongInNode().runTests()
    } catch (err) {
        chai.expect(err.toString()).contain("Wrong answer in test #1\n\nThis is error message!")
        return
    }
    throw new Error("The test should fail with wrong answer message!")
});

