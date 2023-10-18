import {StageTest, correct, wrong} from "../../../../dist/hstest/index.js"
import path from 'path'
const workingDir = path.join(import.meta.url, '../')
const pagePath = path.join(import.meta.url, '../index.html')

//const {StageTest, correct, wrong} = require('hs-test-web');

class ConverterTest extends StageTest {

    page = this.getPage(pagePath)
    tests = [

        this.page.execute(async () => {
                return correct();
            }
        ),
        this.node.execute(async () => {

            const client = await this.page.pageInstance.target().createCDPSession()
            await client.send(
                'Page.setDownloadBehavior', {
                    behavior: 'allow',
                    downloadPath: workingDir + path.sep + "downloads"
                }
            );
            return correct()
        }),
    ]
}

it('Test client', async function () {
    try {
        this.timeout(30000)
    } catch (ignored) {
    }
    try {
        await new ConverterTest().runTests();
    } catch (e) {
        console.log(e);
        throw new Error("The test should pass all test cases!");
    }
}, 30000)

