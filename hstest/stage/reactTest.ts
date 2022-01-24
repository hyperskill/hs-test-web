import StageTest from "./stageTest.js";
import ReactRunner from "../testing/runner/reactRunner.js";
import callsite from "callsite";
import path from "path";

class ReactTest extends StageTest {

    host = 'localhost';
    port = 31328;

    constructor() {
        super();
        const path: string = ReactTest.getUserDirPath(callsite());
        this.runner = new ReactRunner(this.host, this.port, path);
    }

    private static getUserDirPath(stack: callsite.CallSite[]): string {
        const requester = stack[2].getFileName();
        const path_folders = path.join(decodeURIComponent(requester)).split(path.sep);
        return path_folders.slice(1, path_folders.length - 2).join(path.sep);
    }

    async runTests() {
        const runner = this.runner as ReactRunner;
        runner.port = this.port || 31328;
        runner.host = this.host || "localhost";
        await super.runTests();
    }
}

export default ReactTest;
