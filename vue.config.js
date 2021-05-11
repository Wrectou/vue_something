module.exports = {
  // 禁用eslint-loader
  lintOnSave:false,
  devServer: {
    open: true
  },
  // 去除生产环境console
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
    }
  },
}