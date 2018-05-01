const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

const extractSassConsfig =
    ExtractTextPlugin.extract({
        use: [
            {
                loader: 'css-loader',
                options: {
                    minimize: true,
                    sourceMap: true,
                }
            },
            {
                loader: 'postcss-loader',
                options: {
                    sourceMap: true,
                    plugins: [
                        require('autoprefixer')
                    ]
                }
            },
            {
                loader: 'sass-loader',
                options: {
                    sourceMap: true,
                }
            },
        ]
    });

const config = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: 'dist',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],

            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    plugins: [
        new ExtractTextPlugin('css/main.min.css'),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: __dirname,
        compress: true,
        port: 3000,
        hot: true,
    },
    devtool: "overlay",
};

module.exports = (env, options) => {
    if( options.mode !== 'development' ) {
        config.module.rules[1].use = extractSassConsfig;
    }

    return config;
};
