import {StageTest, correct} from "../../../../dist/hstest/index.js"
import { expect } from 'chai'

class UnexpectedErrorOnWrongTestCaseTest extends StageTest {
    tests = [
        this.node.execute(() => {
            return correct()
        }),
        123,
        () => {
            return correct()
        },
        "aasd"
    ]
}

it('Test unexpected error message on wrong test case', async () => {
    try {
        await new UnexpectedErrorOnWrongTestCaseTest().runTests()
    } catch (err) {
        expect(err.toString()).to.contain("Unexpected error during testing\n\nWe have recorded this bug and will fix it soon.\n\n")
        expect(err.toString()).to.contain("Error: Found a wrong test case that is not a function")
        return
    }
    throw new Error("The test should fail with wrong answer message!")
});
