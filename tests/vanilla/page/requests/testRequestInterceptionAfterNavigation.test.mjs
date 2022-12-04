import {StageTest, correct, wrong} from "../../../../dist/hstest/index.js"
import path from 'path'

const pagePath = path.join(import.meta.url, '../index.html')

class TestRequestInterceptionTest extends StageTest {

    page = this.getPage(pagePath)

    tests = [
        this.node.execute(async () => {
            const button = await this.page.findById('http');
            await button.click();
            if (this.page.requests.length !== 1) {
                return wrong('Expected only one request');
            }
            const navigateButton = await this.page.findById('navigate');
            await navigateButton.clickForNavigation();
            const anotherButton = await this.page.findById('http');
            await anotherButton.click();
            if (this.page.requests.length === 1) {
                return wrong('Expected more than 1 request');
            }
            if (this.page.requests[0].url() !== 'https://get.geojs.io/v1/ip/country.json?ip=8.8.8.8') {
                return wrong('Wrong url')
            }
            return correct()
        })
    ];
}

it('Test request interception', async () => {
    await new TestRequestInterceptionTest().runTests()
});
