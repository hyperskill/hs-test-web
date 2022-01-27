const {StageTest, correct, wrong, TestPassed, WrongAnswer} = require("../../../hstest/index.js")
const path = require("path")
const chai = require('chai')

const pagePath = path.join(__dirname, './index.html')

class TestCorrect extends StageTest {
    tests = [
        this.node.execute(() => {
            return correct()
        })
    ];
}

it('corrected single test', async () => {
    try {
        await new TestCorrect().runTests()
    } catch (err) {
        throw new Error("The test should pass all test cases!")
    }
});

class TestWrong extends StageTest {
    tests = [
        this.node.execute(() => {
            return wrong("something went wrong!")
        })
    ];
}

it('wrong single test', async () => {
    try {
        await new TestWrong().runTests()
    } catch (err) {
        chai.expect(err.toString()).contain("Wrong answer in test #1")
        chai.expect(err.toString()).contain("something went wrong!")
        return
    }
    throw new Error("The test should fail with wrong answer message!")
});

class TestFailSecondTest extends StageTest {
    tests = [
        this.node.execute(() => {
            return correct()
        }),
        this.node.execute(() => {
            return wrong("the second test fail!")
        })
    ];
}

it('fail second test', async () => {
    try {
        await new TestFailSecondTest().runTests()
    } catch (err) {
        chai.expect(err.toString()).contain("Wrong answer in test #2")
        chai.expect(err.toString()).contain("the second test fail!")
        return
    }
    throw new Error("The test should fail second test case with wrong answer message!")
});

class TestFailSecondTestWithMoreTests extends StageTest {
    tests = [
        this.node.execute(() => {
            return correct()
        }),
        this.node.execute(() => {
            return wrong("the second test fail!")
        }),
        this.node.execute(() => {
            return correct()
        }),
    ];
}

it('fail second test when there are 3 test cases', async () => {
    try {
        await new TestFailSecondTestWithMoreTests().runTests()
    } catch (err) {
        chai.expect(err.toString()).not.contain("Wrong answer in test #3")
        return
    }
    throw new Error("The test should fail second test case with wrong answer message!")
});

class TestFailTestInEvalMethod extends StageTest {

    page = this.getPage(pagePath)

    tests = [
        this.node.execute(async () => {

            await this.page.evaluate(async () => {
                return wrong('wrong result!')
            })

            return correct()
        })
    ];
}

it('fail test in eval method', async () => {
    try {
        await new TestFailTestInEvalMethod().runTests()
    } catch (err) {
        chai.expect(err.toString()).contain("Wrong answer in test #1")
        return
    }
    throw new Error("The test should fail second test case with wrong answer message!")
});

class TestPassTestInEvalMethod extends StageTest {

    page = this.getPage(pagePath)

    tests = [
        this.node.execute(async () => {

            await this.page.evaluate(async () => {
                return correct()
            })

            return wrong('wrong result!')
        })
    ];
}

it('pass test in eval method', async () => {
    await new TestPassTestInEvalMethod().runTests()
});

class TestThrowTestPassedException extends StageTest {

    page = this.getPage(pagePath)

    tests = [
        this.node.execute(async () => {

            if (true) {
                throw new TestPassed()
            }

            return wrong('should not fail')
        })
    ];
}

it('test TestPassed exception', async () => {
    await new TestThrowTestPassedException().runTests()
});

class TestThrowWrongAnswerException extends StageTest {

    page = this.getPage(pagePath)

    tests = [
        this.node.execute(async () => {

            if (true) {
                throw new WrongAnswer('error feedback')
            }

            return correct()
        })
    ];
}

it('test WrongAnswer exception', async () => {
    try {
        await new TestThrowWrongAnswerException().runTests()
    } catch (err) {
        chai.expect(err.toString()).contain('Wrong answer in test #1')
        chai.expect(err.toString()).contain('error feedback')
    }
});


