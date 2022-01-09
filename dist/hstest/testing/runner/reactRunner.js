var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// @ts-nocheck
import TestRunner from "./runner.js";
import Webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";
import path from "path";
import http from "http";
import UnexpectedError from "../../exception/outcome/UnexpectedError.js";
class ReactRunner extends TestRunner {
    constructor(host, port, dirPath) {
        super();
        this.closeUrl = "closeWebPackDevServer";
        this.host = host;
        this.port = port;
        this.dirPath = dirPath;
    }
    test(testRun) {
        return __awaiter(this, void 0, void 0, function* () {
            return testRun.testCase();
        });
    }
    setUp() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.compileReactProject();
            yield this.browser.launch();
        });
    }
    tearDown() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.closeServer();
            yield this.browser.close();
        });
    }
    compileReactProject() {
        return __awaiter(this, void 0, void 0, function* () {
            const webpackConfig = {
                mode: 'development',
                entry: path.join(this.dirPath, "src/index.js"),
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
                                ],
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
                    contentBase: path.join(this.dirPath, "public"),
                    stats: 'errors-only',
                    liveReload: false,
                }
            };
            let isCompilationCompleted = false;
            let errors = [];
            const compiler = Webpack(webpackConfig);
            const server = new WebpackDevServer(compiler, webpackConfig.devServer);
            server.listen(this.port, this.host);
            server.compiler.hooks.afterCompile.tap('afterCompile', (params) => __awaiter(this, void 0, void 0, function* () {
                if (params.errors.length !== 0) {
                    errors = params.errors;
                }
                isCompilationCompleted = true;
            }));
            server.app.get(`/${this.closeUrl}`, (req, res) => {
                res.sendStatus(200);
                server.close();
            });
            const sleep = (ms) => new Promise(res => setTimeout(res, ms));
            while (!isCompilationCompleted) {
                yield sleep(100);
            }
            if (errors.length !== 0) {
                throw new UnexpectedError("Compile error!");
            }
        });
    }
    closeServer() {
        return __awaiter(this, void 0, void 0, function* () {
            http.get(`http://${this.host}:${this.port}/${this.closeUrl}`, (resp) => {
            });
        });
    }
}
export default ReactRunner;
//# sourceMappingURL=reactRunner.js.map