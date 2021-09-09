const {StageTest, correct, wrong} = require("../../../hstest/index.js")
const path = require("path")

class UnexpectedErrorTest extends StageTest {

}

test('Test unexpected error message', async () => {
    try {
        await new UnexpectedErrorTest().runTests()
    } catch (err) {
        expect(err.toString()).toContain("Unexpected error during testing\n\nWe have recorded this bug and will fix it soon.\n\n")
        return
    }
    fail("The test should fail with wrong answer message!")
});


