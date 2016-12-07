var path = require('path');
var webpack = require('webpack');

module.exports = function (config) {
    config.set({
        browsers: ['PhantomJS'],
        singleRun: true,
        frameworks: ['jasmine'],
        files: [
            'node_modules/babel-polyfill/dist/polyfill.js',
            'src/**/*.spec.js'
        ],
        preprocessors: {
            'src/**/*.spec.js': ['webpack']
        },
        reporters: ['dots', 'coverage'],
        coverageReporter: {
            dir: 'bin/coverage/',

            reporters: [
                {type: 'text-summary'},
                {type: 'lcov', subdir: 'lcov'}
            ]
        },
        webpack: {
            node: {
                fs: 'empty'
            },

            // Instrument code that isn't test or vendor code.
            module: {
                loaders: [
                    {
                        test: /\.jsx?$/,
                        include: path.join(__dirname, 'src'),
                        loader: 'babel'
                    },
                    {
                        test: /\.s?css$/,
                        loaders: ['style', 'css', 'sass']
                    }, {
                        test: /\.(ttf|eot|svg|woff)$/,
                        loader: "url-loader"
                    }
                ],
                preLoaders: [
                    {
                        test: /^((?!\.spec\.).)*\.jsx?$/,
                        loader: 'isparta',
                        include: path.join(__dirname, 'src')
                    }
                ]
            }
        },
        webpackMiddleware: {
            noInfo: true //please don't spam the console when running in karma!
        }
    });
};
