const {StageTest} = require("./stage/stageTest.js")
const {ReactTest} = require("./stage/reactTest.js")
const {CheckResult} = require("./outcome/check_result.js")

module.exports = {
    StageTest,
    ReactTest,
    wrong: CheckResult.wrong,
    correct: CheckResult.correct
}
