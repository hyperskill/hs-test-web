const {StageTest, correct, wrong} = require("../../../hstest/index.js")
const path = require("path")

class UnexpectedErrorOnWrongCheckResultTest extends StageTest {
    tests = [
        this.node.execute(() => {
            return "wrong"
        })
    ]
}

test('Test unexpected error message', async () => {
    try {
        await new UnexpectedErrorOnWrongCheckResultTest().runTests()
    } catch (err) {
        expect(err.toString()).toContain("Unexpected error in test #1\n\n" +
            "We have recorded this bug and will fix it soon.\n\n" +
            "Error: Expected CheckResult instance as a result of the test case")
        return
    }
    fail("The test should fail with wrong answer message!")
});

class UnexpectedErrorOnNullCheckResultTest extends StageTest {
    tests = [
        this.node.execute(() => {
            return null
        })
    ]
}

test('Test unexpected error message', async () => {
    try {
        await new UnexpectedErrorOnNullCheckResultTest().runTests()
    } catch (err) {
        expect(err.toString()).toContain("Unexpected error in test #1\n\n" +
            "We have recorded this bug and will fix it soon.\n\n" +
            "Error: Expected CheckResult instance as a result of the test case")
        return
    }
    fail("The test should fail with wrong answer message!")
});

class UnexpectedErrorOnUndefinedCheckResultTest extends StageTest {
    tests = [
        this.node.execute(() => {
        })
    ]
}

test('Test unexpected error message', async () => {
    try {
        await new UnexpectedErrorOnUndefinedCheckResultTest().runTests()
    } catch (err) {
        expect(err.toString()).toContain("Unexpected error in test #1\n\n" +
            "We have recorded this bug and will fix it soon.\n\n" +
            "Error: Expected CheckResult instance as a result of the test case")
        return
    }
    fail("The test should fail with wrong answer message!")
});


