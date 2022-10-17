import {StageTest, correct, wrong} from "../../../../dist/hstest/index.js";

import chai from "chai";

class UnexpectedErrorOnWrongCheckResultTest extends StageTest {
    tests = [
        this.node.execute(() => {
            return "wrong"
        })
    ]
}

it('Test unexpected error message 1', async () => {
    try {
        await new UnexpectedErrorOnWrongCheckResultTest().runTests()
    } catch (err) {
        chai.expect(err.toString()).to.contain("Unexpected error in test #1\n\nWe have recorded this bug and will fix it soon.\n\n")
        chai.expect(err.toString()).to.contain("Error: Expected CheckResult instance as a result of the test case")
        return
    }
    throw new Error("The test should fail with wrong answer message!")
});

class UnexpectedErrorOnNullCheckResultTest extends StageTest {
    tests = [
        this.node.execute(() => {
            return null
        })
    ]
}

it('Test unexpected error message 2', async () => {
    try {
        await new UnexpectedErrorOnNullCheckResultTest().runTests()
    } catch (err) {
        chai.expect(err.toString()).to.contain("Unexpected error in test #1\n\nWe have recorded this bug and will fix it soon.\n\n")
        chai.expect(err.toString()).to.contain("Error: Expected CheckResult instance as a result of the test case")
        return
    }
    throw new Error("The test should fail with wrong answer message!")
});

class UnexpectedErrorOnUndefinedCheckResultTest extends StageTest {
    tests = [
        this.node.execute(() => {
        })
    ]
}

it('Test unexpected error message 3', async () => {
    try {
        await new UnexpectedErrorOnUndefinedCheckResultTest().runTests()
    } catch (err) {
        chai.expect(err.toString()).to.contain("Unexpected error in test #1\n\nWe have recorded this bug and will fix it soon.\n\n")
        chai.expect(err.toString()).to.contain("Error: Expected CheckResult instance as a result of the test case")
        return
    }
    throw new Error("The test should fail with wrong answer message!")
});


