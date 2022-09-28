import {StageTest} from "../../../../dist/hstest/index.js"

import chai from "chai"

class TestVersionsOnUnexpectedError extends StageTest {

}

it('Test unexpected error message on no tests found', async () => {
    try {
        await new TestVersionsOnUnexpectedError().runTests()
    } catch (err) {
        const pattern = "Unexpected error during testing\n\nWe have recorded this bug and will fix it soon.\n\n" +
            "System \.+\n" +
            "Testing library version \.+\n" +
            "Node.js version \.+\n" +
            "Puppeteer version \.+\n" +
            "Mocha version \.+";

        const regex = new RegExp(pattern)
        chai.expect(err.toString()).to.match(new RegExp(pattern))
        return
    }
    throw new Error("The test should fail with unexpected error!")
});


