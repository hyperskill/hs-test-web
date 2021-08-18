class NodeEnvironment {
    execute(testCase) {
        return async () => {
            return testCase();
        }
    }
}

module.exports = {
    NodeEnvironment: NodeEnvironment
}
