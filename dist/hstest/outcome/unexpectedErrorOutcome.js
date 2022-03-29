"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
Object.defineProperty(exports, "__esModule", { value: true });
const outcome_js_1 = __importDefault(require("./outcome.js"));
const os_1 = __importDefault(require("os"));
const libPackage = __importStar(require("../../package.json"));
const puppeteerPackage = __importStar(require("puppeteer/package.json"));
const mochaPackage = __importStar(require("mocha/package.json"));
class UnexpectedErrorOutcome extends outcome_js_1.default {
    constructor(testNum, cause) {
        super(testNum, "");
        this.errorText = "We have recorded this bug and will fix it soon.\n\n";
        const versions = `System ${os_1.default.platform()} ${os_1.default.release()} ${os_1.default.arch()}\n` +
            `Testing library version ${libPackage.version}\n` +
            `Node.js version ${process.versions.node}\n` +
            `Puppeteer version ${puppeteerPackage.version}\n` +
            `Mocha version ${mochaPackage.version}`;
        this.errorText += versions + "\n\n";
        if (cause.stack) {
            this.errorText += cause.stack;
        }
        else {
            this.errorText += cause.toString();
        }
    }
    getType() {
        return "Unexpected error";
    }
}
exports.default = UnexpectedErrorOutcome;
//# sourceMappingURL=unexpectedErrorOutcome.js.map