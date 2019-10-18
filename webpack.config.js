const path = require('path');
const webpack = require("webpack");
const sass = require("node-sass");
const sassUtils = require("node-sass-utils")(sass);
const { sassOverriderByTheme } = require('./node_modules/insidesales-components/lib/sassConfiguration.js');
const theme = require('./node_modules/insidesales-components/lib/styles/themes.js').blueYellowTheme;

module.exports = {
    entry: {
        'sh-toast-service': './src/sh-toast-service.js',
    },
    output: {
        path: path.join(__dirname, 'bin'),
        filename: '[name].js',
        library: '[name]',
        libraryTarget: 'umd'
    },
    externals: [
        {
            react: {
                root: 'React',
                commonjs2: 'react',
                commonjs: 'react',
                amd: 'react'
            }
        },
        {
            'react-dom': {
                root: 'ReactDOM',
                commonjs2: 'react-dom',
                commonjs: 'react-dom',
                amd: 'react-dom'
            }
        },
        {
            lodash: {
                root: '_',
                commonjs2: 'lodash',
                commonjs: 'lodash',
                amd: 'lodash'
            }
        }
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: ['babel-loader']
            },
            {
                test: /\.html$/,
                loader: "file?name=[name].[ext]"
            },
            {
                test: /\.s?css$/,
                use: [
                  {
                    loader: "style-loader"
                  },
                  {
                    loader: "css-loader"
                  },
                  {
                    loader: "sass-loader",
                    options: sassOverriderByTheme({ theme, sassUtils, sass })
                  },
                ]
            },
            {
                test: /\.(ttf|eot|svg|woff)$/,
                loader: "url-loader"
            },
        ]
    }
};
