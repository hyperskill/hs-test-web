const {StageTest, correct, wrong} = require("../../../hstest/index.js")
const path = require("path")
const chai = require('chai')

class UnexpectedErrorTest extends StageTest {

}

it('Test unexpected error message', async () => {
    try {
        await new UnexpectedErrorTest().runTests()
    } catch (err) {
        chai.expect(err.toString()).contain("Unexpected error during testing\n\nWe have recorded this bug and will fix it soon.\n\n")
        return
    }
    throw new Error("The test should fail with wrong answer message!")
});


