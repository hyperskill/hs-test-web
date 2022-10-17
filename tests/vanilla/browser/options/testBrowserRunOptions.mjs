global.browserOptions = {
    defaultViewport: {
        height: 500,
        width: 500
    }
}

import {StageTest, correct, wrong} from "../../../../dist/hstest/index.js"
import path from 'path'

const pagePath = path.join(import.meta.url, '../index.html')


class TestBrowserRunOptions extends StageTest {

    page = this.getPage(pagePath)

    tests = [
        this.node.execute(async () => {
            const viewport = await this.page.viewport()
            if (viewport?.height !== 500) {
                return wrong("Expected viewport height 500px")
            }
            if (viewport?.width !== 500) {
                return wrong("Expected viewport width 500px")
            }
            return correct();
        })
    ]
}

it('test browser run options', async () => {
    await new TestBrowserRunOptions()
        .runTests().finally(() => {
            global.browserOptions = null;
        })
});


