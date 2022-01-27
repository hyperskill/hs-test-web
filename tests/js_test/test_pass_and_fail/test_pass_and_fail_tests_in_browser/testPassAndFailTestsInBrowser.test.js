const {StageTest, correct, wrong} = require("../../../../hstest/index.js")
const path = require("path")
const chai = require('chai')

const pagePath = path.join(__dirname, './index.html')

class TestCorrect extends StageTest {

    page = this.getPage(pagePath)

    tests = [
        this.page.execute(() => {
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

    page = this.getPage(pagePath)

    tests = [
        this.page.execute(() => {
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

    page = this.getPage(pagePath)

    tests = [
        this.page.execute(() => {
            return correct()
        }),
        this.page.execute(() => {
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

    page = this.getPage(pagePath)

    tests = [
        this.page.execute(() => {
            return correct()
        }),
        this.page.execute(() => {
            return wrong("the second test fail!")
        }),
        this.page.execute(() => {
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

