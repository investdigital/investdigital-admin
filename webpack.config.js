const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
    entry: [
        './src/index.js'
    ],
    output: {
        path: path.resolve(__dirname, "./dist"),
        publicPath: '/',
        filename: 'bundle.[chunkhash:8].js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-1']
                }
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            }
            // {
            //     test: /\.json$/,
            //     use: 'json-loader'
            // }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
            publicPath: './',
        }),
        new CopyWebpackPlugin([{
            from: './public',
            to: 'public'
        }])
    ],
    resolve: {
        extensions: [ '.js', '.jsx',  '.css']
    },
    devServer: {
        historyApiFallback: true,
        contentBase: './'
    }
};
