class NodeEnvironment {
    execute(testCase: Function): Function {
        return async () => {
            return testCase();
        }
    }
}

export default NodeEnvironment;
