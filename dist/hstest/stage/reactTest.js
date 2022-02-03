import StageTest from "./stageTest.js";
import ReactRunner from "../testing/runner/reactRunner.js";
import callsite from "callsite";
import path from "path";
class ReactTest extends StageTest {
    constructor() {
        super();
        this.host = 'localhost';
        this.port = 31328;
        const path = ReactTest.getUserDirPath(callsite());
        this.runner = new ReactRunner(this.host, this.port, path);
    }
    static getUserDirPath(stack) {
        const requester = stack[2].getFileName();
        const path_folders = path.join(decodeURIComponent(requester)).split(path.sep);
        return path_folders.slice(1, path_folders.length - 2).join(path.sep);
    }
    async runTests() {
        const runner = this.runner;
        runner.port = this.port || 31328;
        runner.host = this.host || "localhost";
        await super.runTests();
    }
}
export default ReactTest;
//# sourceMappingURL=reactTest.js.map