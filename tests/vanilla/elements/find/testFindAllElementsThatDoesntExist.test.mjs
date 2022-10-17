import {StageTest, correct, wrong} from "../../../../dist/hstest/index.js"
import path from 'path'

const pagePath = path.join(import.meta.url, '../index.html')


class TestFindNonExistingElementTest1 extends StageTest {

    page = this.getPage(pagePath)

    tests = [
        this.node.execute(async () => {
            const test = await this.page.findAllByClassName('notExist')
            if (test.length !== 0) {
                return wrong('should be empty list')
            }
            return correct()
        })
    ]
}

it('test elements', async () => {
    await new TestFindNonExistingElementTest1().runTests()
});

class TestFindNonExistingElementTest2 extends StageTest {

    page = this.getPage(pagePath)

    tests = [
        this.node.execute(async () => {
            const test = await this.page.findAllBySelector('div.notExist')
            if (test.length !== 0) {
                return wrong('should be empty list')
            }
            return correct()
        })
    ]
}

it('test elements', async () => {
    await new TestFindNonExistingElementTest2().runTests()
});
