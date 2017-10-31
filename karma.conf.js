module.exports = function(config) {

    var libBase = 'src/lib/';

    config.set({
        basePath: '',
        frameworks: ['jasmine', 'karma-typescript'],

        files: [
            { pattern: './base.spec.ts' },
            { pattern: libBase + '**/*[^.d$].ts' }
        ],

        exclude: [
            'index.ts'
        ],

        preprocessors: {
            '**/*.ts': ['karma-typescript']
        },

        reporters: ['progress', 'karma-typescript', 'htmlDetailed'],

        port: 9876,

        colors: true,

        logLevel: config.LOG_INFO,

        autoWatch: false,

        browsers: ['Chrome','Chromium','Firefox'],
        
        customLaunchers: {
          ChromeNoSandbox: {
            base: 'Chrome',
            flags: ['--no-sandbox']
          }
        },

        singleRun: true,

        concurrency: Infinity,

        karmaTypescriptConfig: {
            tsconfig: libBase + 'tsconfig.spec.json',
            bundlerOptions: {
                entrypoints: /\.spec\.ts$/,
                transforms: [
                    require("karma-typescript-angular2-transform")
                ]
            },
            compilerOptions: {
                lib: ["ES2015", "DOM"]
            }
        },

        htmlDetailed: {
            splitResults: true,
            useHostedBootstrap: true
        }
    })
}
