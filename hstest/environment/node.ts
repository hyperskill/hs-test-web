class NodeEnvironment {
    execute(testCase: NoArgsFunction): NoArgsFunction {
        return async () => {
            return testCase();
        };
    }
}

export default NodeEnvironment;
