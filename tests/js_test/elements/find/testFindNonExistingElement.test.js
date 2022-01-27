const {StageTest, correct, wrong} = require("../../../../hstest")
const path = require("path")

const pagePath = path.join(__dirname, './index.html')

class TestFindNonExistingElementTest1 extends StageTest {

    page = this.getPage(pagePath)

    tests = [
        this.node.execute(async () => {
            const test = await this.page.findByClassName('non_existing')
            if (test !== null) {
                return wrong('should be null')
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
            const test = await this.page.findById('non_existing')
            if (test !== null) {
                return wrong('should be null')
            }
            return correct()
        })
    ]
}

it('test elements', async () => {
    await new TestFindNonExistingElementTest2().runTests()
});

class TestFindNonExistingElementTest3 extends StageTest {

    page = this.getPage(pagePath)

    tests = [
        this.node.execute(async () => {
            const test = await this.page.findBySelector("input[type='password']")
            if (test !== null) {
                return wrong('should be null')
            }
            return correct()
        })
    ]
}

it('test elements', async () => {
    await new TestFindNonExistingElementTest3().runTests()
});

class TestFindNonExistingElementTest4 extends StageTest {

    page = this.getPage(pagePath)

    tests = [
        this.node.execute(async () => {
            const test = await this.page.findByClassName("test")
            const result = await test.findByClassName('non_existing')
            if (result !== null) {
                return wrong('should be null')
            }
            return correct()
        })
    ]
}

it('test elements', async () => {
    await new TestFindNonExistingElementTest4().runTests()
});

class TestFindNonExistingElementTest5 extends StageTest {

    page = this.getPage(pagePath)

    tests = [
        this.node.execute(async () => {
            const test = await this.page.findByClassName("test")
            const result = await test.findById('wrapper')
            if (result !== null) {
                return wrong('should be null')
            }
            return correct()
        })
    ]
}

it('test elements', async () => {
    await new TestFindNonExistingElementTest5().runTests()
});

class TestFindNonExistingElementTest6 extends StageTest {

    page = this.getPage(pagePath)

    tests = [
        this.node.execute(async () => {
            const test = await this.page.findByClassName("test")
            const result = await test.findBySelector("input[type='text']")
            if (result !== null) {
                return wrong('should be null')
            }
            return correct()
        })
    ]
}

it('test elements', async () => {
    await new TestFindNonExistingElementTest6().runTests()
});

