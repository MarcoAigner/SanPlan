module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/SanPlan/'
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
