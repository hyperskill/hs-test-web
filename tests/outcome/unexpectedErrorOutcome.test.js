import {StageTest, correct, wrong} from "../../dist/index.js"
import path from 'path'
import chai from 'chai'

const pagePath = path.join(import.meta.url, '../index.html')

class UnexpectedErrorTest extends StageTest {

}

it('Test unexpected error message', async () => {
    try {
        await new UnexpectedErrorTest().runTests()
    } catch (err) {
        chai.expect(err.toString()).contain("Unexpected error during testing\n\nWe have recorded this bug and will fix it soon.\n\n")
        return
    }
    throw new Error("The test should fail with wrong answer message!")
});


