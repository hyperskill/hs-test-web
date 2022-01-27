const {StageTest} = require("./stage/stageTest.js")
const {ReactTest} = require("./stage/reactTest.js")
const {CheckResult} = require("./outcome/checkResult.js")
const {TestPassed} = require("./exception/testPassed.js")
const {WrongAnswer} = require("./exception/wrongAnswer.js")

global.isNewTests = true

module.exports = {
    StageTest,
    ReactTest,
    TestPassed,
    WrongAnswer,
    wrong: CheckResult.wrong,
    correct: CheckResult.correct,
    ...require("./oldStageTest.js")
}
