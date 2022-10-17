import {StageTest, correct, WrongAnswer} from "../../../../dist/hstest/index.js"
import chai from 'chai'

class TestThrowWrongAnswerInTestCase extends StageTest {
    tests = [
        this.node.execute(() => {
            return correct()
        }),
        this.node.execute(() => {
            if (true) {
                throw new WrongAnswer("This is error message thrown from a test case!")
            }
            return correct()
        }),
        this.node.execute(() => {
            return correct()
        })
    ];
}

it('test node context fail the second test', async () => {
    try {
        await new TestThrowWrongAnswerInTestCase().runTests()
    } catch (err) {
        chai.expect(err.toString()).contain("Wrong answer in test #2\n\n" +
            "This is error message thrown from a test case!")
        return
    }
    throw new Error("The test should fail with wrong answer message!")
});
