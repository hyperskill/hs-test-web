const {ReactTest, correct, wrong} = require("../../../hstest/index.js")
const path = require("path")

const pagePath = path.join(__dirname, './index.html')

class CompilationErrorTest extends ReactTest {

    tests = [
        this.node.execute(() => {
            return correct()
        })
    ]
}

test('Test error outcome message', async () => {
    try {
        await new CompilationErrorTest().runTests()
    } catch (err) {
        expect(err.toString()).toContain("Compilation error in test #1\n\n")
        return
    }
    fail("The test should fail with wrong answer message!")
});



