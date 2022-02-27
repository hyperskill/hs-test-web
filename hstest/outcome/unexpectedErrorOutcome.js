"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var outcome_js_1 = __importDefault(require("./outcome.js"));
var os_1 = __importDefault(require("os"));
var libPackage = __importStar(require("../../package.json"));
var puppeteerPackage = __importStar(require("puppeteer/package.json"));
var mochaPackage = __importStar(require("mocha/package.json"));
var UnexpectedErrorOutcome = /** @class */ (function (_super) {
    __extends(UnexpectedErrorOutcome, _super);
    function UnexpectedErrorOutcome(testNum, cause) {
        var _this = _super.call(this, testNum, "") || this;
        _this.errorText = "We have recorded this bug and will fix it soon.\n\n";
        var versions = "System ".concat(os_1["default"].platform(), " ").concat(os_1["default"].release(), " ").concat(os_1["default"].arch(), "\n") +
            "Testing library version ".concat(libPackage.version, "\n") +
            "Node.js version ".concat(process.versions.node, "\n") +
            "Puppeteer version ".concat(puppeteerPackage.version, "\n") +
            "Mocha version ".concat(mochaPackage.version);
        _this.errorText += versions + "\n\n";
        if (cause.stack) {
            _this.errorText += cause.stack;
        }
        else {
            _this.errorText += cause.toString();
        }
        return _this;
    }
    UnexpectedErrorOutcome.prototype.getType = function () {
        return "Unexpected error";
    };
    return UnexpectedErrorOutcome;
}(outcome_js_1["default"]));
exports["default"] = UnexpectedErrorOutcome;
//# sourceMappingURL=unexpectedErrorOutcome.js.map