module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/sanplan/'
    : '/',
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    disableHostCheck: true,
    proxy: {
      '^/api': {
        target: 'http://localhost:8081',
        changeOrigin: true
      }
    }
  }
}
