import {StageTest} from "../../../../dist/hstest/index.js"

import chai from "chai"

class UnexpectedErrorOnEmptyTestsListTest extends StageTest {

}

it('Test unexpected error message on no tests found', async () => {
    try {
        await new UnexpectedErrorOnEmptyTestsListTest().runTests()
    } catch (err) {
        chai.expect(err.toString()).to.contain("Unexpected error during testing\n\nWe have recorded this bug and will fix it soon.")
        chai.expect(err.toString()).to.contain("Error: No tests found")
        return
    }
    throw new Error("The test should fail with wrong answer message!")
});


