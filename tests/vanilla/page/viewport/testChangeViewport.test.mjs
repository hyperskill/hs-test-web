import {StageTest, correct, wrong} from "../../../../dist/hstest/index.js"
import path from 'path'

const pagePath = path.join(import.meta.url, '../index.html')

class TestPageEvaluateResult extends StageTest {

    page = this.getPage(pagePath)

    tests = [
        this.node.execute(async () => {

            await this.page.evaluate(() => {
                const element = document.getElementById("test");
                if (window.getComputedStyle(element).backgroundColor !== 'rgb(0, 0, 255)') {
                    return wrong("Wrong initial background color!")
                }
            })

            await this.page.setViewport({
                width:400,
                height: 600
            })

            await this.page.evaluate(() => {
                const element = document.getElementById("test");
                if (window.getComputedStyle(element).backgroundColor !== 'rgb(255, 0, 0)') {
                    return wrong("Wrong background color on small viewport size!")
                }
            })

            const pageViewport = await this.page.viewport();

            if (pageViewport.width !== 400 || pageViewport.height !== 600) {
                return wrong("The page has wrong viewport size!")
            }

            return correct();
        })
    ];
}

it('Test result of the evaluate method', async () => {
        await new TestPageEvaluateResult().runTests()
});
