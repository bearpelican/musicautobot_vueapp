// const IS_PRODUCTION = process.env.NODE_ENV === 'production'

module.exports = {
  outputDir: 'dist',
  assetsDir: 'static',

  // For serving from github pages
  // publicPath: process.env.NODE_ENV === 'production'
  //   ? '/vue_midi_generator/'
  //   : '/',
  publicPath: '/', // For custom domain

  devServer: {
    proxy: {
      '/api*': {
        // // Forward frontend dev server request for /api to django dev server
        // target: 'http://localhost:5000/'
      }
    }
  }
}
