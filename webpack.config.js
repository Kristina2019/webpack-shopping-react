const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const extractPlugin = new ExtractTextPlugin({
    filename : './style.css'
})
module.exports ={
    entry: './index.js', 
    output: {
        filename: '[name].bundle.js', 
        path: path.resolve(__dirname, 'public'), 
        publicPath: '/'
    }, 
    context: path.resolve(__dirname, 'src'), 
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html'
        }), 
        extractPlugin, 
        
    ], 
    devServer: {
        contentBase: path.resolve(__dirname, 'public/assets'), 
        open: true, 
        port: 8080, 
        historyApiFallback: true

    }, 
    module:{
        rules:[
            {
                test: /\.(jpg|png|gif|svg|jpeg)$/, 
                exclude: /node_modules/,
                use:[
                    {
                        loader: 'file-loader', 
                        options: {
                            name: '[name].[ext]', 
                            outputPath: './assets/'
                        }
                    }
                ]
            }, {
                test: /\.scss$/, 
                exclude: /node_modules/,
                use: extractPlugin.extract({
                    use: [{loader: "css-loader", options: {importLoaders: 1}}, "sass-loader", "postcss-loader"], 
                    fallback: 'style-loader'
                })
            },{
                test: /\.js$/, 
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader', 
                    options:{
                        presets:["react", "env", "stage-0"]
                    }
                }
            }
        ]
    }
}