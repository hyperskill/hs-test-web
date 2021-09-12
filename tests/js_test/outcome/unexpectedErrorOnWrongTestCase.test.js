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
        expect(err.toString()).toContain("Unexpected error during testing\n\n" +
            "We have recorded this bug and will fix it soon.\n\n" +
            "Error: Found wrong test case that is not a function")
        return
    }
    fail("The test should fail with wrong answer message!")
});


