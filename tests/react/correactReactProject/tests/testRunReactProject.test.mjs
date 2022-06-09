import {ReactTest, correct, wrong} from "../../../../dist/hstest/index.js"


class TestRunReactProjectTest extends ReactTest {

    page = this.getPage('http://localhost:31328')

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

it('Test run react project', async () => {
    try {
        await new TestRunReactProjectTest().runTests()
    } catch (err) {
        console.log(err.toString())
        throw new Error("The test should pass all test cases!")
    }
}).timeout(30000);
