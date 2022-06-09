import {ReactTest, correct, wrong} from "../../../../dist/hstest/index.js"


class TestFailReactTestsTest extends ReactTest {

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

            return wrong("The test should fail!")
        })
    ];
}

it('Test fail react test', async () => {
    try {
        await new TestFailReactTestsTest().runTests()
        throw new Error("The test should fail!")
    } catch (err) {
    }
}).timeout(30000);
