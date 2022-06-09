const {StageTest, correct, wrong, WrongAnswer} = require("../../dist/hstest/index.js")
const path = require("path")
const chai = require("chai")


const pagePath = path.join(__dirname, 'index.html')

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
