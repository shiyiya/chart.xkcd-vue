const istanbul = require('rollup-plugin-istanbul')

module.exports = (config) => {
  config.set({
    singleRun: true,
    frameworks: ['mocha', 'chai'],
    browsers: ['ChromeHeadless'],
    files: [
      'node_modules/vue/dist/vue.min.js',
      'node_modules/chart.xkcd/dist/chart.xkcd.min.js',
      'test/test.js'
    ],
    preprocessors: {
      'test/test.js': ['rollup']
    },
    rollupPreprocessor: {
      format: 'iife',
      globals: {
        chartXkcd: 'chart.xkcd',
        vue: 'Vue'
      },
      plugins: [istanbul({ exclude: ['test/**/*.js'] })]
    },
    reporters: ['dots', 'coverage'],
    coverageReporter: {
      type: 'lcov',
      subdir: '.'
    }
  })
}
