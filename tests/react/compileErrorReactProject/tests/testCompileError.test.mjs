import {ReactTest, correct, wrong} from "../../../../dist/hstest/index.js"
import chai from 'chai'


class TestCompileError extends ReactTest {

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

it('Test react compile error', async () => {
    try {
        await new TestCompileError().runTests()
        throw new Error("The test should fail with compile error!")
    } catch (err) {
        chai.expect(err.toString()).to.contain("Compilation error during testing")
        chai.expect(err.toString()).to.contain("Module not found: Error: Can't resolve './index.csss'")
        chai.expect(err.toString()).to.contain("Error: Can't resolve './logo.svgs'")
    }
}).timeout(30000);
