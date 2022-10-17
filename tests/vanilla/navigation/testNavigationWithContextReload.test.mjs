import {StageTest, correct} from "../../../dist/hstest/index.js"
import path from 'path'

const pagePath = path.join(import.meta.url, '../index.html')

class TestNavigationWithContextReloadTest extends StageTest {

    page = this.getPage(pagePath)

    tests = [
        this.node.execute(async () => {
            const aboutButton = await this.page.findById("about-button")
            await aboutButton.clickForNavigation({timeout: 1000});
            return correct()
        })
    ];
}

it('test navigation with context reload', async () => {
    await new TestNavigationWithContextReloadTest().runTests()
}).timeout(30000);
