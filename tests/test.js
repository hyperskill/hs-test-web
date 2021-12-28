import {StageTest, correct, wrong} from "../dist/index.js";

class Test extends StageTest {

    page = this.getPage('https://www.google.com/')

    tests = [
        () => {
            return correct("");
        },
        this.page.execute(() => {
            return correct()
        })
    ]
}

it('should pass all the tests', async function () {
    await new Test().runTests();
}).timeout(30000);
