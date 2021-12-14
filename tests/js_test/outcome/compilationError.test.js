const {ReactTest, correct, wrong} = require("../../../hstest/index.js")
const path = require("path")
const chai = require('chai')

const pagePath = path.join(__dirname, './index.html')

class CompilationErrorTest extends ReactTest {

    tests = [
        this.node.execute(() => {
            return correct()
        })
    ]
}

it('Test error outcome message', async () => {
    try {
        await new CompilationErrorTest().runTests()
    } catch (err) {
        chai.expect(err.toString()).contain("Compilation error\n\n")
        return
    }
    throw new Error("The test should fail with wrong answer message!")
});



