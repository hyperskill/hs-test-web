const path = require('path');
const fs = require('fs');

const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const publicPath = 'public';
const nodeModules = 'node_modules';

const studentSolutionPath = 'task';
const sourcesPath = 'src';
const entryFile = 'index.js';

let host = 'localhost';
let port = 3000;
let src = '';


function runServer(host, port, src) {
    const webpackConfig = {
        mode: 'development',
        entry: './' + src + entryFile,
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
            contentBase: path.join(process.cwd(), publicPath),
            stats: 'errors-only',
        }
    };

    const compiler = Webpack(webpackConfig);
    const server = new WebpackDevServer(compiler, webpackConfig.devServer);

    server.listen(port, host, () => {
        console.log(`Starting server on http://${host}:${port}`);
    });

    return server;
}

process.argv.forEach(arg => {
    if (arg.indexOf("port:") === 0) {
        port = arg.slice(5);
    } else if (arg.indexOf("host:") === 0) {
        host = arg.slice(5);
    } else if (arg.indexOf("src:") === 0) {
        src = arg.slice(4);
    } else if (arg.length === 1 && arg >= '0' && arg <= '9') {
        src = arg;
    }
});

function getFiles(fromPath, dirs= true, files = true) {
    return fs.readdirSync(fromPath, {withFileTypes: true})
        .filter(item => !item.isDirectory() && dirs
                     || !item.isFile() && files)
        .map(item => item.name)
        .filter(item => !item.startsWith(".")
                     && item !== nodeModules
                     && item !== publicPath);
}

if (src.length <= 1) {
    let rootFolders = getFiles('.', files = false);

    if (rootFolders.length !== 1) {
        console.error("Cannot find a path to sources, make sure " +
            "you didn't create folders in the project root -\n" + process.cwd());
        return;
    }

    let stageFolders = getFiles('./' + rootFolders, files = false);

    if (stageFolders.includes(studentSolutionPath)) {
        src = `${rootFolders}/${studentSolutionPath}/${sourcesPath}/`;

    } else if (src.length === 1) {
        stageFolders = stageFolders.filter(item => item.endsWith(src));
        if (stageFolders.length === 0) {
            console.error(`Cannot find a path to sources, ` +
                `no such stage (${src}) -\n${process.cwd() + path.sep + rootFolders}`);
            return;
        }
        src = `${rootFolders}/${stageFolders[0]}/${sourcesPath}/`;
    } else {
        console.error("Cannot find a path to sources, " +
            `no folders found -\n${process.cwd() + path.sep + rootFolders}`);
        return;
    }
}


runServer(host, port, src);
