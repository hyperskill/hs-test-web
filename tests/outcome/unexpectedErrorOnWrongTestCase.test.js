import {StageTest, correct, wrong} from "../../dist/index.js"
import path from 'path'
import chai from 'chai'

const pagePath = path.join(import.meta.url, '../index.html')

class UnexpectedErrorOnWrongTestCaseTest extends StageTest {
    tests = [
        this.node.execute(() => {
            return correct()
        }),
        () => {
            return correct()
        },
        123,
        "aasd"
    ]
}

it('Test unexpected error message', async () => {
    try {
        await new UnexpectedErrorOnWrongTestCaseTest().runTests()
    } catch (err) {

        const pattern = "Unexpected error during testing\n\nWe have recorded this bug and will fix it soon.\n\n" +
            "Error: Found a wrong test case that is not a function"

        const regex = new RegExp(pattern)

        console.log(err.toString())

        chai.expect(regex.exec(err.toString())).to.not.equal(null)
        return
    }
    throw new Error("The test should fail with wrong answer message!")
});


