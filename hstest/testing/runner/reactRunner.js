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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var runner_js_1 = __importDefault(require("./runner.js"));
var path_1 = __importDefault(require("path"));
var http_1 = __importDefault(require("http"));
var CompilationError_js_1 = __importDefault(require("../../exception/outcome/CompilationError.js"));
var UnexpectedError_js_1 = __importDefault(require("../../exception/outcome/UnexpectedError.js"));
var ReactRunner = /** @class */ (function (_super) {
    __extends(ReactRunner, _super);
    function ReactRunner(host, port, dirPath) {
        var _this = _super.call(this) || this;
        _this.closeUrl = "closeWebPackDevServer";
        _this.host = host;
        _this.port = port;
        _this.dirPath = dirPath;
        return _this;
    }
    ReactRunner.prototype.test = function (testRun) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, testRun.testCase()];
            });
        });
    };
    ReactRunner.prototype.setUp = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.compileReactProject()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.browser.launch()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ReactRunner.prototype.tearDown = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.closeServer()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.browser.close()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ReactRunner.prototype.compileReactProject = function () {
        return __awaiter(this, void 0, void 0, function () {
            var Webpack, WebpackDevServer, err_1, webpackConfig, isCompilationCompleted, errors, compiler, server, sleep;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require("webpack")); })];
                    case 1:
                        Webpack = (_a.sent())["default"];
                        return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require("webpack-dev-server")); })];
                    case 2:
                        WebpackDevServer = (_a.sent())["default"];
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        throw new UnexpectedError_js_1["default"]("React dependencies are not installed!");
                    case 4:
                        webpackConfig = {
                            mode: 'development',
                            entry: path_1["default"].join(this.dirPath, "src/index.js"),
                            module: {
                                rules: [
                                    {
                                        test: /\.jsx?$/,
                                        loader: 'babel-loader',
                                        exclude: /node_modules/,
                                        options: {
                                            presets: [
                                                "@babel/preset-env",
                                                "@babel/preset-react"
                                            ]
                                        }
                                    },
                                    {
                                        test: /\.css$/,
                                        use: ['style-loader', 'css-loader']
                                    },
                                    {
                                        test: /\.(png|svg|jpg|gif)$/,
                                        use: 'file-loader'
                                    },
                                    {
                                        test: /\.(woff|woff2|eot|ttf|otf)$/,
                                        use: 'file-loader'
                                    },
                                ]
                            },
                            devServer: {
                                contentBase: path_1["default"].join(this.dirPath, "public"),
                                stats: 'errors-only'
                            }
                        };
                        isCompilationCompleted = false;
                        errors = [];
                        compiler = Webpack(webpackConfig);
                        server = new WebpackDevServer(compiler, webpackConfig.devServer);
                        server.listen(this.port, this.host);
                        // @ts-ignore
                        server.compiler.hooks.afterCompile.tap('afterCompile', function (params) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                if (params.errors.length !== 0) {
                                    errors = params.errors;
                                }
                                isCompilationCompleted = true;
                                return [2 /*return*/];
                            });
                        }); });
                        // @ts-ignore
                        server.app.get("/".concat(this.closeUrl), function (req, res) {
                            res.sendStatus(200);
                            server.close();
                        });
                        sleep = function (ms) { return new Promise(function (res) { return setTimeout(res, ms); }); };
                        _a.label = 5;
                    case 5:
                        if (!!isCompilationCompleted) return [3 /*break*/, 7];
                        return [4 /*yield*/, sleep(100)];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 7:
                        if (errors.length !== 0) {
                            throw new CompilationError_js_1["default"](errors);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ReactRunner.prototype.closeServer = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new Promise(function (resolve) {
                            http_1["default"].get("http://".concat(_this.host, ":").concat(_this.port, "/").concat(_this.closeUrl), resolve);
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return ReactRunner;
}(runner_js_1["default"]));
exports["default"] = ReactRunner;
//# sourceMappingURL=reactRunner.js.map