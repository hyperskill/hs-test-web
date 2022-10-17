import {StageTest, correct, WrongAnswer} from "../../../dist/hstest/index.js"
import path from 'path'
import chai from 'chai'

const pagePath = path.join(import.meta.url, '../index.html')

class TestNavigationErrorOutcomeTest extends StageTest {

    page = this.getPage(pagePath)

    tests = [
        this.node.execute(async () => {
            const aboutButton = await this.page.findById("fake-button")
            await aboutButton.clickForNavigation({timeout: 1000}).catch(err => {
                throw new WrongAnswer(err.toString());
            });
            return correct()
        })
    ];
}

it('test navigation error', async () => {
    try {
        await new TestNavigationErrorOutcomeTest().runTests();
    } catch (err) {
        chai.expect(err.toString()).contain("Wrong answer in test #1\n\nTimeoutError: Navigation timeout of 1000 ms exceeded");
        return;
    }
    throw new Error("The test should fail!");
}).timeout(30000);
