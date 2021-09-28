const {StageTest, correct, wrong, TestPassed, WrongAnswer} = require("../../../hstest/index.js")
const path = require("path")

const pagePath = path.join(__dirname, './index.html')

class TestCorrect extends StageTest {
    tests = [
        this.node.execute(() => {
            return correct()
        })
    ];
}

test('corrected single test', async () => {
    try {
        await new TestCorrect().runTests()
    } catch (err) {
        fail("The test should pass all test cases!")
    }
});

class TestWrong extends StageTest {
    tests = [
        this.node.execute(() => {
            return wrong("something went wrong!")
        })
    ];
}

test('wrong single test', async () => {
    try {
        await new TestWrong().runTests()
    } catch (err) {
        expect(err.toString()).toContain("Wrong answer in test #1")
        expect(err.toString()).toContain("something went wrong!")
        return
    }
    fail("The test should fail with wrong answer message!")
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

test('fail second test', async () => {
    try {
        await new TestFailSecondTest().runTests()
    } catch (err) {
        expect(err.toString()).toContain("Wrong answer in test #2")
        expect(err.toString()).toContain("the second test fail!")
        return
    }
    fail("The test should fail second test case with wrong answer message!")
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

test('fail second test when there are 3 test cases', async () => {
    try {
        await new TestFailSecondTestWithMoreTests().runTests()
    } catch (err) {
        expect(err.toString()).not.toContain("Wrong answer in test #3")
        return
    }
    fail("The test should fail second test case with wrong answer message!")
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

test('fail test in eval method', async () => {
    try {
        await new TestFailTestInEvalMethod().runTests()
    } catch (err) {
        expect(err.toString()).toContain("Wrong answer in test #1")
        return
    }
    fail("The test should fail second test case with wrong answer message!")
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

test('pass test in eval method', async () => {
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

test('test TestPassed exception', async () => {
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

test('test WrongAnswer exception', async () => {
    try {
        await new TestThrowWrongAnswerException().runTests()
    } catch (err) {
        expect(err.toString()).toContain('Wrong answer in test #1')
        expect(err.toString()).toContain('error feedback')
    }
});


