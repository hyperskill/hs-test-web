const {StageTest, correct, wrong} = require("../../../hstest/index.js")
const path = require("path")

class UnexpectedErrorOnEmptyTestsListTest extends StageTest {

}

test('Test unexpected error message', async () => {
    try {
        await new UnexpectedErrorOnEmptyTestsListTest().runTests()
    } catch (err) {
        expect(err.toString()).toContain("Unexpected error during testing\n\nWe have recorded this bug and will fix it soon.\n\nError: No tests found")
        return
    }
    fail("The test should fail with wrong answer message!")
});


