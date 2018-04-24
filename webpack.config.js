const path = require('path');
const slsw = require('serverless-webpack');

module.exports = {
    entry: slsw.lib.entries,
    devtool: 'eval',
    resolve: {
        extensions: [
            '.js',
            '.json',
            '.ts',
            '.tsx'
        ]
    },
    target: 'node',
    output: {
        libraryTarget: 'commonjs',
        path: path.join(__dirname, '.webpack'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader', 'shebang-loader']
            },
            {
            test: /\.ts(x?)$/,
            use: [{
                loader: 'ts-loader'
            }]
        }]
    }
};