import StageTest from './stage/stageTest.js';
import CheckResult from "./outcome/checkResult.js";
import WrongAnswer from "./exception/outcome/WrongAnswer.js";
import ReactTest from './stage/reactTest.js';

const correct = CheckResult.correct;
const wrong = CheckResult.wrong;

export {
    StageTest,
    ReactTest,
    correct,
    wrong,
    WrongAnswer
};

export default StageTest;


