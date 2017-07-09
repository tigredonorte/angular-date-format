module.exports = function(config) {
    config.set({

        basePath: '',
        frameworks: ['jasmine', 'karma-typescript'],

        files: [
            { pattern: 'base.spec.ts' },
            { pattern: 'src/*.ts' }
        ],

        preprocessors: {
            '**/*.ts': ['karma-typescript']
        },

        reporters: ['progress', 'karma-typescript'],

        port: 9876,

        colors: true,

        logLevel: config.LOG_INFO,

        autoWatch: false,

        browsers: ['Firefox'],

        singleRun: true,

        concurrency: Infinity,

        karmaTypescriptConfig: {
            tsconfig: 'src/tsconfig.spec.json',
            bundlerOptions: {
                entrypoints: /\.spec\.ts$/,
                transforms: [
                    require("karma-typescript-angular2-transform")
                ]
            },
            compilerOptions: {
                lib: ["ES2015", "DOM"]
            }
        }
    })
}
