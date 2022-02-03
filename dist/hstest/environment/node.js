class NodeEnvironment {
    execute(testCase) {
        return async () => {
            return testCase();
        };
    }
}
export default NodeEnvironment;
//# sourceMappingURL=node.js.map