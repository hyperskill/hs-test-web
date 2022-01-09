// @ts-nocheck
import TestRunner from "./runner.js";
import TestRun from "../testRun.js";
import Webpack from "webpack"
import WebpackDevServer from "webpack-dev-server"

import path from "path";
import http from "http";
import UnexpectedError from "../../exception/outcome/UnexpectedError.js";

class ReactRunner extends TestRunner {

    port: number;
    host: string;
    dirPath: string;
    closeUrl: string = "closeWebPackDevServer"

    constructor(host: string, port: number, dirPath: string) {
        super();
        this.host = host;
        this.port = port;
        this.dirPath = dirPath;
    }

    async test(testRun: TestRun): Promise<any> {
        return testRun.testCase();
    }

    async setUp(): Promise<any> {
        await this.compileReactProject();
        await this.browser.launch();
    }

    async tearDown(): Promise<any> {
        await this.closeServer();
        await this.browser.close();
    }

    private async compileReactProject(): Promise<void> {
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

        let isCompilationCompleted: boolean = false;
        let errors: any[] = [];

        const compiler = Webpack(webpackConfig);
        const server = new WebpackDevServer(compiler, webpackConfig.devServer);

        server.listen(this.port, this.host)

        server.compiler.hooks.afterCompile.tap('afterCompile', async (params) => {
            if (params.errors.length !== 0) {
                errors = params.errors;
            }
            isCompilationCompleted = true;
        });

        server.app.get(`/${this.closeUrl}`, (req, res) => {
            res.sendStatus(200);
            server.close();
        });

        const sleep = (ms:number) => new Promise(res => setTimeout(res, ms));

        while (!isCompilationCompleted) {
            await sleep(100);
        }

        if (errors.length !== 0) {
            throw new UnexpectedError("Compile error!")
        }
    }

    private async closeServer() {
        http.get(`http://${this.host}:${this.port}/${this.closeUrl}`, (resp) => {
        })
    }
}

export default ReactRunner;
