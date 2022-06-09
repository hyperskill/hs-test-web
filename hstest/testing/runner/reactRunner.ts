import TestRunner from "./runner.js";
import TestRun from "../testRun.js";

import path from "path";
import http from "http";
import CompilationError from "../../exception/outcome/CompilationError.js";
import UnexpectedError from "../../exception/outcome/UnexpectedError.js";

class ReactRunner extends TestRunner {

    port: number;
    host: string;
    private readonly dirPath: string;
    private closeUrl = "closeWebPackDevServer";

    constructor(host: string, port: number, dirPath: string) {
        super();
        this.host = host;
        this.port = port;
        this.dirPath = dirPath;
    }

    async test(testRun: TestRun): Promise<void> {
        return testRun.testCase();
    }

    async setUp(): Promise<void> {
        await this.compileReactProject();
        await this.browser.launch();
    }

    async tearDown(): Promise<void> {
        await this.closeServer();
        await this.browser.close();
    }

    private async compileReactProject(): Promise<void> {

        let Webpack;
        let WebpackDevServer;

        try {
            Webpack = (await import("webpack")).default;
            WebpackDevServer = (await import("webpack-dev-server")).default;
        } catch (err) {
            throw new UnexpectedError("React dependencies are not installed!");
        }

        const webpackConfig: any = {
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
            }
        };

        let isCompilationCompleted = false;
        let errors: Error[] = [];

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

        const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));

        while (!isCompilationCompleted) {
            await sleep(100);
        }

        if (errors.length !== 0) {
            throw new CompilationError(errors);
        }
    }

    private async closeServer() {
        await new Promise(resolve => {
            http.get(`http://${this.host}:${this.port}/${this.closeUrl}`, resolve);
        });
    }
}

export default ReactRunner;
