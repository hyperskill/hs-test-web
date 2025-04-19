import {StageTest, correct} from "../../../../dist/hstest/index.js"
import { expect } from 'chai'

class UnexpectedErrorOnRuntimeErrorTest extends StageTest {
    tests = [
        this.node.execute(() => {
            let a = document;
            return correct();
        })
    ]
}

it('Test unexpected error message on runtime error', async () => {
    try {
        await new UnexpectedErrorOnRuntimeErrorTest().runTests()
    } catch (err) {
        expect(err.toString()).contain("Unexpected error in test #1\n\nWe have recorded this bug and will fix it soon.\n\n")
        expect(err.toString()).contain("ReferenceError: document is not defined")
        return
    }
    throw new Error("The test should fail with unexpected error!")
});
