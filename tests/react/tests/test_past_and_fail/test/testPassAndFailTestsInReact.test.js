const {ReactTest, correct, wrong} = require("../../../../../hstest/index.js")
const path = require("path")
const chai = require('chai')

const pagePath = 'http://localhost:31328'

class TestCorrect extends ReactTest {

    page = this.getPage(pagePath)

    tests = [
        this.page.execute(() => {
            const app = document.getElementsByClassName("App")

            if (app[0] === null) {
                return wrong("can't find element with #app")
            }

            if (app[0].textContent !== 'Edit src/App.js and save to reload.Learn React') {
                return wrong("Wrong text content!")
            }

            return correct()
        })
    ];
}


it('corrected single test', async () => {
    try {
        await new TestCorrect().runTests()
    } catch (err) {
        console.log(err)
        throw new Error("The test should pass all test cases!")
    }
}).timeout(30000);

class TestWrong extends ReactTest {

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
}).timeout(30000);

class TestFailSecondTest extends ReactTest {

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
}).timeout(30000);

class TestFailSecondTestWithMoreTests extends ReactTest {

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
    fail("The test should fail second test case with wrong answer message!")
}).timeout(30000);



