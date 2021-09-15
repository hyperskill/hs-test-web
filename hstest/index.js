const {StageTest} = require("./stage/stageTest.js")
const {ReactTest} = require("./stage/reactTest.js")
const {CheckResult} = require("./outcome/checkResult.js")

global.isNewTests = true

module.exports = {
    StageTest,
    ReactTest,
    wrong: CheckResult.wrong,
    correct: CheckResult.correct,
    ...require("./oldStageTest.js")
}
