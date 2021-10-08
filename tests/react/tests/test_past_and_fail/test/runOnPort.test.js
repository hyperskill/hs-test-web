const {ReactTest, correct, wrong} = require("../../../../../hstest/index.js")


class TestCorrect extends ReactTest {

    port = 41567
    page = this.getPage('http://localhost:41567')

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

jest.setTimeout(30000)
test('test react run on another port', async () => {
    try {
        await new TestCorrect().runTests()
    } catch (err) {
        console.log(err)
        fail("The test should pass all test cases!")
    }
});
