module.exports = function(config) {
  config.set({
    singleRun: true,
    frameworks: ['jasmine'],
    files: [
      'src/**/*.js',
      'spec/**/*spec.js'
    ],
    reporters: ['progress'],
    browsers: ['Chrome']
  })
}
