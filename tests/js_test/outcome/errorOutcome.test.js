const {StageTest, correct, wrong} = require("../../../hstest/index.js")
const path = require("path")

const pagePath = path.join(__dirname, './index.html')

class ErrorOutcomeTestInBrowser extends StageTest {

    page = this.getPage(pagePath)

    tests = [
        this.page.execute(() => {
            throw new Error("Protocol error")
        })
    ]
}

test('Test error outcome message', async () => {
    try {
        await new ErrorOutcomeTestInBrowser().runTests()
    } catch (err) {
        console.log(err)
        expect(err.toString()).toContain("Error in test #1\n\nError: Evaluation failed: Error: Protocol error")
        return
    }
    fail("The test should fail with wrong answer message!")
});

class ErrorOutcomeTestInNode extends StageTest {

    tests = [
        this.node.execute(() => {
            throw new Error("Protocol error")
        })
    ]
}

test('Test error outcome message', async () => {
    try {
        await new ErrorOutcomeTestInNode().runTests()
    } catch (err) {
        console.log(err)
        expect(err.toString()).toContain("Error in test #1\n\nError: Protocol error")
        return
    }
    fail("The test should fail with wrong answer message!")
});


