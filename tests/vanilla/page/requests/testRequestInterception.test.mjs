import {StageTest, correct, wrong} from "../../../../dist/hstest/index.js"
import path from 'path'

global.browserOptions = {
    args: ['--start-maximized', '--disable-infobar', '--disable-site-isolation-trials']
}

const pagePath = path.join(import.meta.url, '../index.html')

class TestRequestInterceptionTest extends StageTest {

    page = this.getPage(pagePath)

    tests = [
        this.node.execute(async () => {
            const button = await this.page.findById('http');
            await button.click()
            await new Promise(r => setTimeout(r, 2000));
            if (this.page.requests.length !== 1) {
                return wrong('Expected only one request!')
            }
            await button.click()
            if (this.page.requests.length !== 2) {
                return wrong('Expected 2 requests!')
            }
            return correct()
        })
    ];
}

it('Test request interception', async () => {
    await new TestRequestInterceptionTest().runTests()
}).timeout(15000);
