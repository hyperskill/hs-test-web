const {StageTest, correct, wrong} = require("../../../hstest/index.js")
const path = require("path")
const chai = require('chai')

const pagePath = path.join(__dirname, './index.html')

class ErrorOutcomeTestInBrowser extends StageTest {

    page = this.getPage(pagePath)

    tests = [
        this.page.execute(() => {
            throw new Error("Protocol error")
        })
    ]
}

it('Test error outcome message', async () => {
    try {
        await new ErrorOutcomeTestInBrowser().runTests()
    } catch (err) {
        console.log(err)
        chai.expect(err.toString()).contain("Error in test #1\n\nError: Evaluation failed: Error: Protocol error")
        return
    }
    throw new Error("The test should fail with wrong answer message!")
});

class ErrorOutcomeTestInNode extends StageTest {

    tests = [
        this.node.execute(() => {
            throw new Error("Protocol error")
        })
    ]
}

it('Test error outcome message', async () => {
    try {
        await new ErrorOutcomeTestInNode().runTests()
    } catch (err) {
        console.log(err)
        chai.expect(err.toString()).contain("Error in test #1\n\nError: Protocol error")
        return
    }
    throw new Error("The test should fail with wrong answer message!")
});

class ErrorOutcomeOnContextDestroyedTest extends StageTest {

    tests = [
        this.node.execute(() => {
            throw new Error("Execution context was destroyed, most likely because of a navigation.")
        })
    ]
}

it('Test error outcome on context destroyed', async () => {
    try {
        await new ErrorOutcomeOnContextDestroyedTest().runTests()
    } catch (err) {
        chai.expect(err.toString()).contain("Error in test #1\n\nError: Execution context was destroyed, most likely because of a navigation.")
        return
    }
    throw new Error("The test should fail with error message!")
});

class ErrorOutcomeOnChromiumRevisionIsNotDownloaded extends StageTest {

    tests = [
        this.node.execute(() => {
            throw new Error("Chromium revision is not downloaded")
        })
    ]
}

it('Test error outcome on chromium revision is not downloaded error', async () => {
    try {
        await new ErrorOutcomeOnChromiumRevisionIsNotDownloaded().runTests()
    } catch (err) {
        chai.expect(err.toString()).contain("Error in test #1\n\nError: Chromium revision is not downloaded")
        return
    }
    throw new Error("The test should fail with error message!")
});


