"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NodeEnvironment {
    execute(testCase) {
        return async () => {
            return testCase();
        };
    }
}
exports.default = NodeEnvironment;
//# sourceMappingURL=node.js.map