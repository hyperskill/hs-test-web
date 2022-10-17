import {StageTest, correct, wrong} from "../../../../dist/hstest/index.js"
import chai from "chai";

class TestErrorOutcomeOnProtocolError extends StageTest {

    tests = [
        this.node.execute(() => {
            throw new Error("Protocol error!")
            return correct();
        })
    ]
}

it('Test error outcome on protocol error', async () => {
    try {
        await new TestErrorOutcomeOnProtocolError().runTests()
        throw new Error("The test fail with Error outcome!")
    } catch (err) {
        chai.expect(err.toString()).to.contain("Error: Protocol error!")
    }
});

class TestErrorOutcomeOnContextWasDestroyed extends StageTest {

    tests = [
        this.node.execute(() => {
            throw new Error("context was destroyed")
            return correct();
        })
    ]
}

it('Test error outcome on context was destroyed', async () => {
    try {
        await new TestErrorOutcomeOnContextWasDestroyed().runTests()
        throw new Error("The test fail with Error outcome!")
    } catch (err) {
        chai.expect(err.toString()).to.contain("The page has been reloaded or navigated, but it should not")
    }
});

class TestErrorOutcomeOnRevisionIsNotDownloaded extends StageTest {

    tests = [
        this.node.execute(() => {
            throw new Error("Chromium revision is not downloaded")
            return correct();
        })
    ]
}

it('Test error outcome on revision is not downloaded', async () => {
    try {
        await new TestErrorOutcomeOnRevisionIsNotDownloaded().runTests()
        throw new Error("The test fail with Error outcome!")
    } catch (err) {
        chai.expect(err.toString()).to.contain("Error: Chromium revision is not downloaded")
    }
});
