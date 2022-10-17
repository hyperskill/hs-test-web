import {StageTest, correct, wrong} from "../../../../dist/hstest/index.js"
import chai from 'chai'

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
        chai.expect(err.toString()).contain("Unexpected error in test #1\n\nWe have recorded this bug and will fix it soon.\n\n")
        chai.expect(err.toString()).contain("ReferenceError: document is not defined")
        return
    }
    throw new Error("The test should fail with unexpected error!")
});
