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
const runner_js_1 = __importDefault(require("./runner.js"));
const path_1 = __importDefault(require("path"));
const http_1 = __importDefault(require("http"));
const CompilationError_js_1 = __importDefault(require("../../exception/outcome/CompilationError.js"));
const UnexpectedError_js_1 = __importDefault(require("../../exception/outcome/UnexpectedError.js"));
class ReactRunner extends runner_js_1.default {
    constructor(host, port, dirPath) {
        super();
        this.closeUrl = "closeWebPackDevServer";
        this.host = host;
        this.port = port;
        this.dirPath = dirPath;
    }
    async test(testRun) {
        return testRun.testCase();
    }
    async setUp() {
        await this.compileReactProject();
        await this.browser.launch();
    }
    async tearDown() {
        await this.closeServer();
        await this.browser.close();
    }
    async compileReactProject() {
        let Webpack;
        let WebpackDevServer;
        try {
            Webpack = (await Promise.resolve().then(() => __importStar(require("webpack")))).default;
            WebpackDevServer = (await Promise.resolve().then(() => __importStar(require("webpack-dev-server")))).default;
        }
        catch (err) {
            throw new UnexpectedError_js_1.default("React dependencies are not installed!");
        }
        const webpackConfig = {
            mode: 'development',
            entry: path_1.default.join(this.dirPath, "src/index.js"),
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
                contentBase: path_1.default.join(this.dirPath, "public"),
                stats: 'errors-only',
            }
        };
        let isCompilationCompleted = false;
        let errors = [];
        const compiler = Webpack(webpackConfig);
        const server = new WebpackDevServer(compiler, webpackConfig.devServer);
        server.listen(this.port, this.host);
        // @ts-ignore
        server.compiler.hooks.afterCompile.tap('afterCompile', async (params) => {
            if (params.errors.length !== 0) {
                errors = params.errors;
            }
            isCompilationCompleted = true;
        });
        // @ts-ignore
        server.app.get(`/${this.closeUrl}`, (req, res) => {
            res.sendStatus(200);
            server.close();
        });
        const sleep = (ms) => new Promise(res => setTimeout(res, ms));
        while (!isCompilationCompleted) {
            await sleep(100);
        }
        if (errors.length !== 0) {
            throw new CompilationError_js_1.default(errors);
        }
    }
    async closeServer() {
        await new Promise(resolve => {
            http_1.default.get(`http://${this.host}:${this.port}/${this.closeUrl}`, resolve);
        });
    }
}
exports.default = ReactRunner;
//# sourceMappingURL=reactRunner.js.map