import {StageTest, correct, wrong} from "../../../../dist/hstest/index.js"
import chai from 'chai'

class UnexpectedErrorTestBeforeTests extends StageTest {

}

it('Test unexpected error message before the tests', async () => {
    try {
        await new UnexpectedErrorTestBeforeTests().runTests()
    } catch (err) {
        chai.expect(err.toString()).contain("Unexpected error during testing\n\nWe have recorded this bug and will fix it soon.\n\n")
        return
    }
    throw new Error("The test should fail with wrong answer message!")
});

class UnexpectedErrorTestInTests1 extends StageTest {
    tests = [
        this.node.execute(() => {
            return 123;
        }),
        this.node.execute(() => {
            return correct();
        })
    ]
}

it('Test unexpected error message in the tests 1', async () => {
    try {
        await new UnexpectedErrorTestInTests1().runTests()
    } catch (err) {
        chai.expect(err.toString()).contain("Unexpected error in test #1\n\nWe have recorded this bug and will fix it soon.\n\n")
        return
    }
    throw new Error("The test should fail with wrong answer message!")
});


class UnexpectedErrorTestInTests2 extends StageTest {
    tests = [
        this.node.execute(() => {
            return correct();
        }),
        this.node.execute(() => {
            return 123;
        })
    ]
}

it('Test unexpected error message in the tests 2', async () => {
    try {
        await new UnexpectedErrorTestInTests2().runTests()
    } catch (err) {
        chai.expect(err.toString()).contain("Unexpected error in test #2\n\nWe have recorded this bug and will fix it soon.\n\n")
        return
    }
    throw new Error("The test should fail with wrong answer message!")
});


