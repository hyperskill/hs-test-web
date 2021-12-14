const {StageTest, correct, wrong} = require("../../../hstest/index.js")
const path = require("path")
const chai = require('chai')

class UnexpectedErrorOnWrongCheckResultTest extends StageTest {
    tests = [
        this.node.execute(() => {
            return "wrong"
        })
    ]
}

it('Test unexpected error message', async () => {
    try {
        await new UnexpectedErrorOnWrongCheckResultTest().runTests()
    } catch (err) {
        const pattern = "Unexpected error in test #1\n\nWe have recorded this bug and will fix it soon.\n\n" +
            "System \.+\n" +
            "Testing library version \.+\n" +
            "Node.js version \.+\n" +
            "Puppeteer version \.+\n" +
            "Mocha version \.+\n\n" +
            "Error: Expected CheckResult instance as a result of the test case"

        const regex = new RegExp(pattern)

        chai.expect(regex.exec(err.toString())).to.not.equal(null)
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

it('Test unexpected error message', async () => {
    try {
        await new UnexpectedErrorOnNullCheckResultTest().runTests()
    } catch (err) {
        const pattern = "Unexpected error in test #1\n\nWe have recorded this bug and will fix it soon.\n\n" +
            "System \.+\n" +
            "Testing library version \.+\n" +
            "Node.js version \.+\n" +
            "Puppeteer version \.+\n" +
            "Mocha version \.+\n\n" +
            "Error: Expected CheckResult instance as a result of the test case"

        const regex = new RegExp(pattern)

        chai.expect(regex.exec(err.toString())).to.not.equal(null)
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

it('Test unexpected error message', async () => {
    try {
        await new UnexpectedErrorOnUndefinedCheckResultTest().runTests()
    } catch (err) {
        const pattern = "Unexpected error in test #1\n\nWe have recorded this bug and will fix it soon.\n\n" +
            "System \.+\n" +
            "Testing library version \.+\n" +
            "Node.js version \.+\n" +
            "Puppeteer version \.+\n" +
            "Mocha version \.+\n\n" +
            "Error: Expected CheckResult instance as a result of the test case"

        const regex = new RegExp(pattern)

        chai.expect(regex.exec(err.toString())).to.not.equal(null)
        return
    }
    throw new Error("The test should fail with wrong answer message!")
});


