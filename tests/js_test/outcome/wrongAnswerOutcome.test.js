const {StageTest, correct, wrong} = require("../../../hstest/index.js")
const path = require("path")

const pagePath = path.join(__dirname, './index.html')

class TestWrongInBrowser extends StageTest {

    page = this.getPage(pagePath)

    tests = [
        this.page.execute(() => {
            return wrong("This is error message!")
        })
    ];
}

test('test browser context', async () => {
    try {
        await new TestWrongInBrowser().runTests()
    } catch (err) {
        expect(err.toString()).toContain("Wrong answer in test #1\n\nThis is error message!")
        return
    }
    fail("The test should fail with wrong answer message!")
});

class TestWrongInNode extends StageTest {

    tests = [
        this.node.execute(() => {
            return wrong("This is error message!")
        })
    ];
}

test('test browser context', async () => {
    try {
        await new TestWrongInNode().runTests()
    } catch (err) {
        expect(err.toString()).toContain("Wrong answer in test #1\n\nThis is error message!")
        return
    }
    fail("The test should fail with wrong answer message!")
});

