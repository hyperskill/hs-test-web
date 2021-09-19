const {StageTest, correct, wrong} = require("../../../hstest/index.js")
const path = require("path")

const pagePath = path.join(__dirname, './index.html')

class TestFindNonExistingElementTest1 extends StageTest {

    page = this.getPage(pagePath)

    tests = [
        this.node.execute(async () => {
            const test = await this.page.findByClassName('non_existing')
            return correct()
        })
    ]
}

test('test elements', async () => {
    try {
        await new TestFindNonExistingElementTest1().runTests()
    } catch (err) {
        expect(err.toString()).toContain("Wrong answer in test #1\n\n" +
            "Can't find element 'body > .non_existing'")
        return
    }
    fail("The test should fail with wrong answer message!")
});

class TestFindNonExistingElementTest2 extends StageTest {

    page = this.getPage(pagePath)

    tests = [
        this.node.execute(async () => {
            const test = await this.page.findById('non_existing')
            return correct()
        })
    ]
}

test('test elements', async () => {
    try {
        await new TestFindNonExistingElementTest2().runTests()
    } catch (err) {
        expect(err.toString()).toContain("Wrong answer in test #1\n\n" +
            "Can't find element 'body > #non_existing'")
        return
    }
    fail("The test should fail with wrong answer message!")
});

class TestFindNonExistingElementTest3 extends StageTest {

    page = this.getPage(pagePath)

    tests = [
        this.node.execute(async () => {
            const test = await this.page.findBySelector("input[type='password']")
            return correct()
        })
    ]
}

test('test elements', async () => {
    try {
        await new TestFindNonExistingElementTest3().runTests()
    } catch (err) {
        expect(err.toString()).toContain("Wrong answer in test #1\n\n" +
            "Can't find element 'body > input[type='password']'")
        return
    }
    fail("The test should fail with wrong answer message!")
});

class TestFindNonExistingElementTest4 extends StageTest {

    page = this.getPage(pagePath)

    tests = [
        this.node.execute(async () => {
            const test = await this.page.findByClassName("test")
            await test.findByClassName('non_existing')
            return correct()
        })
    ]
}

test('test elements', async () => {
    try {
        await new TestFindNonExistingElementTest4().runTests()
    } catch (err) {
        expect(err.toString()).toContain("Wrong answer in test #1\n\n" +
            "Can't find element 'body > .test > .non_existing'")
        return
    }
    fail("The test should fail with wrong answer message!")
});

class TestFindNonExistingElementTest5 extends StageTest {

    page = this.getPage(pagePath)

    tests = [
        this.node.execute(async () => {
            const test = await this.page.findByClassName("test")
            await test.findById('wrapper')
            return correct()
        })
    ]
}

test('test elements', async () => {
    try {
        await new TestFindNonExistingElementTest5().runTests()
    } catch (err) {
        expect(err.toString()).toContain("Wrong answer in test #1\n\n" +
            "Can't find element 'body > .test > #wrapper'")
        return
    }
    fail("The test should fail with wrong answer message!")
});

class TestFindNonExistingElementTest6 extends StageTest {

    page = this.getPage(pagePath)

    tests = [
        this.node.execute(async () => {
            const test = await this.page.findByClassName("test")
            await test.findBySelector("input[type='text']")
            return correct()
        })
    ]
}

test('test elements', async () => {
    try {
        await new TestFindNonExistingElementTest6().runTests()
    } catch (err) {
        expect(err.toString()).toContain("Wrong answer in test #1\n\n" +
            "Can't find element 'body > .test > input[type='text']'")
        return
    }
    fail("The test should fail with wrong answer message!")
});

