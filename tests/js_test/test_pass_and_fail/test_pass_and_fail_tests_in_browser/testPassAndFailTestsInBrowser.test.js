const {StageTest, correct, wrong} = require("../../../../hstest/index.js")
const path = require("path")

const pagePath = path.join(__dirname, './index.html')

class TestCorrect extends StageTest {

    page = this.getPage(pagePath)

    tests = [
        this.page.execute(() => {
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

    page = this.getPage(pagePath)

    tests = [
        this.page.execute(() => {
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

test('fail second test when there are 3 test cases', async () => {
    try {
        await new TestFailSecondTestWithMoreTests().runTests()
    } catch (err) {
        expect(err.toString()).not.toContain("Wrong answer in test #3")
        return
    }
    fail("The test should fail second test case with wrong answer message!")
});

