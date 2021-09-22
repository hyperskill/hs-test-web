const {StageTest, correct, wrong} = require("../../../hstest/index.js")
const path = require("path")

const pagePath = path.join(__dirname, './index.html')

class TestFindNonExistingElementTest1 extends StageTest {

    page = this.getPage(pagePath)

    tests = [
        this.node.execute(async () => {
            const test = await this.page.findAllByClassName('notExist')
            return correct()
        })
    ]
}

test('test elements', async () => {
    try {
        await new TestFindNonExistingElementTest1().runTests()
    } catch (err) {
        expect(err.toString()).toContain("Wrong answer in test #1\n\n" +
            "Can't find any element 'body > .notExist'")
        return
    }
    fail("The test should fail with wrong answer message!")
});

class TestFindNonExistingElementTest2 extends StageTest {

    page = this.getPage(pagePath)

    tests = [
        this.node.execute(async () => {
            const test = await this.page.findAllBySelector('div.notExist')
            return correct()
        })
    ]
}

test('test elements', async () => {
    try {
        await new TestFindNonExistingElementTest2().runTests()
    } catch (err) {
        expect(err.toString()).toContain("Wrong answer in test #1\n\n" +
            "Can't find any element 'body > div.notExist'")
        return
    }
    fail("The test should fail with wrong answer message!")
});
