import {StageTest, correct, wrong, WrongAnswer} from "../../../../dist/hstest/index.js"
import path from 'path'

const pagePath = path.join(import.meta.url, '../index.html')

function wrongAnswer() {
    throw new WrongAnswer("wrong answer")
}

function nestedFunction() {
    return 123
}

function testFunction() {
    return nestedFunction();
}

class TestExposeFunctionTest extends StageTest {

    page = this.getPage(pagePath)

    tests = [
        this.node.execute(async () => {

            await this.page.exposeFunction("testFunction", testFunction);
            await this.page.exposeFunction("wrongAnswer", wrongAnswer);

            const result = await this.page.evaluate(() => {
                return testFunction();
            })

            if (result !== 123) {
                return wrong('The function was exposed wrong!')
            }

            return correct()
        })
    ];
}

it('Test expose function into page context', async () => {
    try {
        await new TestExposeFunctionTest().runTests()
    } catch (err) {
        console.log(err)
        throw new Error("The test should pass all test cases!")
    }
});
