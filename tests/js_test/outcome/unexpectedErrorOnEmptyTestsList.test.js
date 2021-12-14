const {StageTest, correct, wrong} = require("../../../hstest/index.js")
const path = require("path")
const chai = require('chai')

class UnexpectedErrorOnEmptyTestsListTest extends StageTest {

}

it('Test unexpected error message', async () => {
    try {
        await new UnexpectedErrorOnEmptyTestsListTest().runTests()
    } catch (err) {
        const pattern = "Unexpected error during testing\n\nWe have recorded this bug and will fix it soon.\n\n" +
            "System \.+\n" +
            "Testing library version \.+\n" +
            "Node.js version \.+\n" +
            "Puppeteer version \.+\n" +
            "Mocha version \.+\n\n" +
            "Error: No tests found"

        const regex = new RegExp(pattern)

        console.log(err)

        chai.expect(regex.exec(err.toString())).to.not.equal(null)
        return
    }
    throw new Error("The test should fail with wrong answer message!")
});


