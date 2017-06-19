const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: "./entry.js",
    devtool: 'cheap-module-source-map',
    output: {
        path: __dirname + '/dist',
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ['babel-loader']
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader", options: {
                        sourceMap: true
                    }
                }, {
                    loader: "sass-loader", options: {
                        sourceMap: true
                    }
                }]
            },
            {
                test: /\.css$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader", options: {
                        sourceMap: true
                    }
                }]
            },
            {
                test: /\.html$/,
                use: [{ loader: "html-loader" }]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file?hash=sha512&digest=hex&name=/dist/images/[hash].[ext]',
                    'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            }]
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: 'images/', to: './images/' },
            { from: 'index.html', to: './index.html' }
        ])
        /*
        new webpack.optimize.UglifyJsPlugin({
            minimize: false,
            comments: false,
            mangle: false
        })
        */
    ]
};