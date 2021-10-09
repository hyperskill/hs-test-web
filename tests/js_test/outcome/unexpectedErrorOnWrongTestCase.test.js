const {StageTest, correct, wrong} = require("../../../hstest/index.js")
const path = require("path")

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

test('Test unexpected error message', async () => {
    try {
        await new UnexpectedErrorOnWrongTestCaseTest().runTests()
    } catch (err) {

        const pattern = "Unexpected error during testing\n\nWe have recorded this bug and will fix it soon.\n\n" +
            "System \.+\n" +
            "Testing library version \.+\n" +
            "Node.js version \.+\n" +
            "Puppeteer version \.+\n" +
            "Jest version \.+\n\n" +
            "Error: Found wrong test case that is not a function"

        const regex = new RegExp(pattern)

        expect(regex.exec(err.toString())).not.toBe(null)
        return
    }
    fail("The test should fail with wrong answer message!")
});


