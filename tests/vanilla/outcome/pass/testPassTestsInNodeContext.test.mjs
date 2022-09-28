import {StageTest, correct} from "../../../../dist/hstest/index.js"

class TestPassTestsInNodeContextTest extends StageTest {
    tests = [
        this.node.execute(() => {
            return correct();
        }),
        this.node.execute(() => {
            return correct();
        }),
        this.node.execute(() => {
            return correct();
        }),
        this.node.execute(() => {
            return correct();
        }),
    ]
}

it('Test pass all the tests in node context', async () => {
    try {
        await new TestPassTestsInNodeContextTest().runTests()
    } catch (err) {
        throw new Error("The test should pass all the tests!")
    }
});
