var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    runTests() {
        const _super = Object.create(null, {
            runTests: { get: () => super.runTests }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const runner = this.runner;
            runner.port = this.port || 31328;
            runner.host = this.host || "localhost";
            yield _super.runTests.call(this);
        });
    }
}
export default ReactTest;
//# sourceMappingURL=reactTest.js.map