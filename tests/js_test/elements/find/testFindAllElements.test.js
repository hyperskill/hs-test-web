const {StageTest, correct, wrong} = require("../../../../hstest")
const path = require("path")

const pagePath = path.join(__dirname, './index.html')

class TestFindExistingElementsTest extends StageTest {

    page = this.getPage(pagePath)

    tests = [
        this.node.execute(async () => {
            const test1 = await this.page.findAllByClassName('t1')
            const test2 = await this.page.findAllBySelector('div.t1')
            const test3 = await this.page.findByClassName('test')
            const another = await test3.findByClassName('another')
            const t2s1 = await another.findAllByClassName('t2')
            if (t2s1.length !== 3) {
                return wrong("wrong!")
            }
            const t2s2 = await another.findAllBySelector('div.t2')
            if (t2s2.length !== 3) {
                return wrong("wrong!")
            }
            return correct()
        })
    ]
}

it('test elements', async () => {
    await new TestFindExistingElementsTest().runTests()
});
