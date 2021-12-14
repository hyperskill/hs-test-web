const {StageTest, correct, wrong} = require("../../../hstest/index.js")
const path = require("path")
const chai = require('chai')

class UnexpectedErrorOnWrongTestCaseTest extends StageTest {
    tests = [
        this.node.execute(() => {
            return correct()
        }),
        () => {
            return correct()
        },
        123,
        "aasd"
    ]
}

it('Test unexpected error message', async () => {
    try {
        await new UnexpectedErrorOnWrongTestCaseTest().runTests()
    } catch (err) {

        const pattern = "Unexpected error during testing\n\nWe have recorded this bug and will fix it soon.\n\n" +
            "System \.+\n" +
            "Testing library version \.+\n" +
            "Node.js version \.+\n" +
            "Puppeteer version \.+\n" +
            "Mocha version \.+\n\n" +
            "Error: Found wrong test case that is not a function"

        const regex = new RegExp(pattern)

        chai.expect(regex.exec(err.toString())).to.not.equal(null)
        return
    }
    throw new Error("The test should fail with wrong answer message!")
});


