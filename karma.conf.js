// Karma configuration for Unit testing

const path = require('path');

const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');

module.exports = function (config) {

    const configuration = {

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        frameworks: ['jasmine'],

        plugins: [
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-webpack'),
            require('karma-sourcemap-loader'),
            require('karma-spec-reporter'),
            require('karma-coverage-istanbul-reporter'),
            require('istanbul-instrumenter-loader')
        ],
        files: [
            { pattern: 'spec.bundle.js', watched: false }
        ],
        exclude: [
        ],
        preprocessors: {
            'spec.bundle.js': ['webpack', 'sourcemap']
        },

        // webpack
        webpack: {
            mode: 'development',
            resolve: {
                extensions: ['.ts', '.js']
            },
            module: {
                rules: [
                    {
                        test: /\.ts/,
                        use: [
                            { loader: 'ts-loader' },
                            { loader: 'angular2-template-loader' },
                            { loader: 'source-map-loader' }
                        ],
                        exclude: /node_modules/
                    },
                    {
                        test: /\.html$/,
                        use: 'raw-loader'
                    },
                    {
                        test: /\.css$/,
                        use: [
                            { loader: 'to-string-loader' },
                            { loader: 'css-loader' }]
                    },
                    {
                        test: /\.scss$/,
                        use: [
                            { loader: 'raw-loader' },
                            { loader: 'sass-loader' }
                        ]
                    },
                    {
                        enforce: 'post',
                        test: /\.ts/,
                        use: [
                            {
                                loader: 'istanbul-instrumenter-loader',
                                options: { esModules: true }
                            }
                        ],
                        exclude: [
                            /\.spec.ts/,
                            /node_modules/
                        ]
                    }
                ],
                exprContextCritical: false
            },
            devtool: 'inline-source-map',
            performance: { hints: false },
            /* Workaround for https://github.com/angular/angular/issues/21560 */
            plugins: [
                new FilterWarningsPlugin({
                    exclude: /System.import/
                })
            ]
        },

        webpackServer: {
            noInfo: true
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['spec', 'coverage-istanbul'],

        coverageIstanbulReporter: {
            reports: ['html', 'lcovonly'],
            dir: path.join(__dirname, 'coverage'),
            fixWebpackSourcePaths: true
        },


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true

    };

    config.set(configuration);
};
