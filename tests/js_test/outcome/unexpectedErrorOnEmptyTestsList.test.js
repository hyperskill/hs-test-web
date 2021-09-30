const {StageTest, correct, wrong} = require("../../../hstest/index.js")
const path = require("path")

class UnexpectedErrorOnEmptyTestsListTest extends StageTest {

}

test('Test unexpected error message', async () => {
    try {
        await new UnexpectedErrorOnEmptyTestsListTest().runTests()
    } catch (err) {
        const pattern = "Unexpected error during testing\n\nWe have recorded this bug and will fix it soon.\n\n" +
            "Testing library version \.+\n" +
            "Node.js version \.+\n" +
            "Puppeteer version \.+\n" +
            "Jest version \.+\n\n" +
            "Error: No tests found"

        const regex = new RegExp(pattern)

        expect(regex.exec(err.toString())).not.toBe(null)
        return
    }
    fail("The test should fail with wrong answer message!")
});


